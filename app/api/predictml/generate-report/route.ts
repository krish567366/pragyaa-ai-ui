import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { filePath, reportId, options } = body;

    if (!filePath || !reportId) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: filePath and reportId' },
        { status: 400 }
      );
    }

    // Prepare options for Python script
    const scriptOptions = {
      target_column: options?.targetColumn || 'target',
      model_name: options?.modelName || 'ML Prediction Model',
      positive_class: options?.positiveClass || null
    };

    // Path to Python script
    const scriptPath = join(process.cwd(), 'scripts', 'generate_report.py');

    // Execute Python script
    return new Promise<NextResponse>((resolve) => {
      const python = spawn('python3', [
        scriptPath,
        filePath,
        reportId,
        JSON.stringify(scriptOptions)
      ]);

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
          console.error('Python script error:', stderr);
          resolve(NextResponse.json({
            success: false,
            message: 'Report generation failed',
            error: stderr
          }, { status: 500 }));
          return;
        }

        try {
          const result = JSON.parse(stdout);
          if (result.success) {
            resolve(NextResponse.json({
              success: true,
              message: 'Report generated successfully',
              reportId: result.report_id,
              reportPath: result.report_path,
              downloadUrl: `/api/predictml/download/${reportId}`
            }));
          } else {
            resolve(NextResponse.json({
              success: false,
              message: result.error || 'Report generation failed'
            }, { status: 500 }));
          }
        } catch (error) {
          console.error('Error parsing Python output:', error);
          resolve(NextResponse.json({
            success: false,
            message: 'Error parsing report generation result',
            output: stdout
          }, { status: 500 }));
        }
      });
    });
  } catch (error) {
    console.error('Generate report error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error during report generation' },
      { status: 500 }
    );
  }
}
