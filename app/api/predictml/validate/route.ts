import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    // Verify authentication token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { filePath, targetColumn } = body;

    if (!filePath) {
      return NextResponse.json(
        { success: false, message: 'File path is required' },
        { status: 400 }
      );
    }

    // Verify file exists
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }

    // Path to validation script
    const scriptPath = join(process.cwd(), 'scripts', 'data_validator.py');
    
    if (!existsSync(scriptPath)) {
      return NextResponse.json(
        { success: false, message: 'Validation script not found' },
        { status: 500 }
      );
    }

    // Prepare script arguments
    const args = [scriptPath, filePath];
    if (targetColumn) {
      args.push(targetColumn);
    }

    return new Promise((resolve) => {
      // Use virtual environment Python path
      const pythonPath = join(process.cwd(), '.venv', 'bin', 'python');
      const python = spawn(pythonPath, args);
      
      let stdout = '';
      let stderr = '';

      python.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      python.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          resolve(
            NextResponse.json(
              { 
                success: false, 
                message: 'Validation script failed', 
                error: stderr 
              },
              { status: 500 }
            )
          );
          return;
        }

        try {
          const result = JSON.parse(stdout);
          
          if (!result.success) {
            resolve(
              NextResponse.json(
                { 
                  success: false, 
                  message: 'Validation failed', 
                  error: result.error 
                },
                { status: 400 }
              )
            );
            return;
          }

          // Add metadata
          const validationResponse = {
            success: true,
            message: 'Data validation completed successfully',
            filePath,
            targetColumn: targetColumn || result.detected_target_column || 'auto-detected',
            detectedTargetColumn: result.detected_target_column,
            validationResults: result.validation_results,
            timestamp: new Date().toISOString()
          };

          resolve(NextResponse.json(validationResponse));
        } catch (parseError) {
          resolve(
            NextResponse.json(
              { 
                success: false, 
                message: 'Failed to parse validation results',
                error: 'Invalid JSON response from validation script'
              },
              { status: 500 }
            )
          );
        }
      });

      // Set timeout for long-running validations
      setTimeout(() => {
        python.kill('SIGTERM');
        resolve(
          NextResponse.json(
            { 
              success: false, 
              message: 'Validation timeout - file too large or complex',
              error: 'Process timeout after 30 seconds'
            },
            { status: 408 }
          )
        );
      }, 30000); // 30 second timeout
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error during validation' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}