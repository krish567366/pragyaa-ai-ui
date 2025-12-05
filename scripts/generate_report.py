#!/usr/bin/env python3
"""
Integration script for PredictML report generation
This script is called by the Next.js API to generate reports from uploaded files
"""

import sys
import os
import json
from pathlib import Path

# Add the scripts directory to path
sys.path.append(str(Path(__file__).parent))

from generic_ml_report_generator import generate_report_from_upload


def main():
    """
    Main entry point for report generation
    Usage: python generate_report.py <file_path> <report_id> [options_json]
    """
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False,
            'error': 'Missing required arguments: file_path and report_id'
        }))
        sys.exit(1)
    
    file_path = sys.argv[1]
    report_id = sys.argv[2]
    
    # Parse options if provided
    options = {}
    if len(sys.argv) > 3:
        try:
            options = json.loads(sys.argv[3])
        except json.JSONDecodeError:
            print(json.dumps({
                'success': False,
                'error': 'Invalid JSON in options argument'
            }))
            sys.exit(1)
    
    # Validate file exists
    if not os.path.exists(file_path):
        print(json.dumps({
            'success': False,
            'error': f'File not found: {file_path}'
        }))
        sys.exit(1)
    
    try:
        # Extract options
        target_column = options.get('target_column', 'target')
        model_name = options.get('model_name', 'ML Prediction Model')
        positive_class = options.get('positive_class', None)
        
        # Generate output path
        output_dir = Path(file_path).parent / 'reports'
        output_dir.mkdir(exist_ok=True)
        output_path = output_dir / f'{report_id}_report.docx'
        
        # Generate report
        result_path = generate_report_from_upload(
            file_path=file_path,
            target_column=target_column,
            model_name=model_name,
            positive_class=positive_class,
            output_path=str(output_path)
        )
        
        # Return success response
        print(json.dumps({
            'success': True,
            'report_path': str(result_path),
            'report_id': report_id,
            'message': 'Report generated successfully'
        }))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e),
            'report_id': report_id
        }))
        sys.exit(1)


if __name__ == '__main__':
    main()
