import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { filePath } = body;

    if (!filePath) {
      return NextResponse.json(
        { success: false, message: 'File path is required' },
        { status: 400 }
      );
    }

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: 404 }
      );
    }

    let columns: string[] = [];
    let suggestedTarget: string | null = null;

    try {
      // Read file based on extension
      if (filePath.endsWith('.csv')) {
        const csvData = await readFile(filePath, 'utf-8');
        const lines = csvData.split('\n').filter(line => line.trim());
        if (lines.length > 0 && lines[0]) {
          columns = lines[0].split(',').map(col => col.trim().replace(/['"]/g, ''));
        }
      } else {
        // For Excel files, we'll need to use Python script to read columns
        // For now, return error asking user to convert to CSV
        return NextResponse.json(
          { success: false, message: 'Please convert Excel file to CSV format' },
          { status: 400 }
        );
      }

      // Suggest target column (common patterns)
      const targetPatterns = [
        'target', 'label', 'class', 'output', 'prediction', 
        'y', 'outcome', 'result', 'category', 'price', 'value',
        'status', 'type', 'grade', 'score', 'rating'
      ];

      // Check for exact matches
      suggestedTarget = columns.find(col => 
        targetPatterns.some(pattern => 
          col.toLowerCase().includes(pattern)
        )
      ) || null;

      // If no match found, suggest last column (common ML convention)
      if (!suggestedTarget && columns.length > 0) {
        suggestedTarget = columns[columns.length - 1] || null;
      }

      return NextResponse.json({
        success: true,
        columns,
        suggestedTarget,
        totalColumns: columns.length
      });

    } catch (parseError) {
      return NextResponse.json(
        { success: false, message: 'Failed to parse file columns', error: String(parseError) },
        { status: 500 }
      );
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error', error: String(error) },
      { status: 500 }
    );
  }
}
