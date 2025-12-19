#!/usr/bin/env python3
"""
Data Validation Script for PredictML
Analyzes uploaded data for quality issues, missing patterns, and mandatory field combinations
"""

import pandas as pd
import numpy as np
import json
import sys
from pathlib import Path
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')


class DataValidator:
    """
    Comprehensive data validation for ML prediction models
    """
    
    def __init__(self, df, target_column=None):
        """
        Initialize data validator
        
        Args:
            df: DataFrame to validate
            target_column: Target column for prediction (optional)
        """
        self.df = df.copy()
        self.target_column = target_column
        self.validation_results = {
            'overall_quality': {},
            'missing_data': {},
            'data_types': {},
            'target_analysis': {},
            'mandatory_combinations': {},
            'recommendations': [],
            'warnings': [],
            'errors': []
        }
        
        # Auto-detect column types
        self.numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        self.categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
        self.date_cols = df.select_dtypes(include=['datetime64']).columns.tolist()
        
        # Attempt to detect date columns in object columns
        self._detect_date_columns()
        
    def _detect_date_columns(self):
        """Detect date columns that might be stored as strings"""
        for col in self.categorical_cols:
            if self.df[col].dtype == 'object':
                # Check if column name suggests date
                date_keywords = ['date', 'time', 'created', 'updated', 'start', 'end', 'birth']
                if any(keyword in col.lower() for keyword in date_keywords):
                    # Try to parse a few values
                    sample = self.df[col].dropna().head(5)
                    if len(sample) > 0:
                        try:
                            pd.to_datetime(sample)
                            self.date_cols.append(col)
                            self.categorical_cols.remove(col)
                        except:
                            pass
    
    def validate_overall_quality(self):
        """Assess overall data quality metrics"""
        total_cells = self.df.shape[0] * self.df.shape[1]
        missing_cells = self.df.isnull().sum().sum()
        
        self.validation_results['overall_quality'] = {
            'total_rows': int(self.df.shape[0]),
            'total_columns': int(self.df.shape[1]),
            'missing_cells': int(missing_cells),
            'completeness_percentage': round((1 - missing_cells/total_cells) * 100, 2),
            'duplicate_rows': int(self.df.duplicated().sum()),
            'unique_rows': int(self.df.shape[0] - self.df.duplicated().sum())
        }
        
        # Quality assessment
        completeness = self.validation_results['overall_quality']['completeness_percentage']
        if completeness >= 95:
            quality_level = "Excellent"
        elif completeness >= 85:
            quality_level = "Good"
        elif completeness >= 70:
            quality_level = "Fair"
        else:
            quality_level = "Poor"
            
        self.validation_results['overall_quality']['quality_level'] = quality_level
        
        # Add warnings for poor quality
        if completeness < 70:
            self.validation_results['errors'].append(
                f"Data quality is poor ({completeness:.1f}% complete). Consider data cleaning."
            )
        elif completeness < 85:
            self.validation_results['warnings'].append(
                f"Data has moderate missing values ({completeness:.1f}% complete)."
            )
    
    def validate_missing_data(self):
        """Analyze missing data patterns"""
        missing_summary = {}
        
        for col in self.df.columns:
            missing_count = self.df[col].isnull().sum()
            missing_pct = (missing_count / len(self.df)) * 100
            
            if missing_count > 0:
                missing_summary[col] = {
                    'missing_count': int(missing_count),
                    'missing_percentage': round(missing_pct, 2),
                    'data_type': str(self.df[col].dtype)
                }
        
        self.validation_results['missing_data'] = missing_summary
        
        # Check for columns with excessive missing data
        for col, info in missing_summary.items():
            if info['missing_percentage'] > 50:
                self.validation_results['errors'].append(
                    f"Column '{col}' has {info['missing_percentage']:.1f}% missing values - consider removal"
                )
            elif info['missing_percentage'] > 20:
                self.validation_results['warnings'].append(
                    f"Column '{col}' has {info['missing_percentage']:.1f}% missing values"
                )
    
    def validate_data_types(self):
        """Analyze data types and suggest improvements"""
        type_summary = {
            'numeric_columns': len(self.numeric_cols),
            'categorical_columns': len(self.categorical_cols),
            'date_columns': len(self.date_cols),
            'column_details': {}
        }
        
        for col in self.df.columns:
            unique_count = self.df[col].nunique()
            total_count = len(self.df[col].dropna())
            
            col_info = {
                'data_type': str(self.df[col].dtype),
                'unique_values': int(unique_count),
                'uniqueness_ratio': round(unique_count / total_count if total_count > 0 else 0, 3)
            }
            
            # Suggest potential issues
            if col in self.categorical_cols and unique_count > total_count * 0.8:
                col_info['suggestion'] = "High cardinality - might be better as identifier"
            elif col in self.numeric_cols and unique_count < 10:
                col_info['suggestion'] = "Low cardinality - might be better as categorical"
            
            type_summary['column_details'][col] = col_info
        
        self.validation_results['data_types'] = type_summary
    
    def validate_target_column(self):
        """Analyze target column if specified"""
        if not self.target_column or self.target_column not in self.df.columns:
            self.validation_results['target_analysis'] = {'status': 'No target column specified or found'}
            return
        
        target_col = self.df[self.target_column]
        unique_values = target_col.unique()
        
        target_analysis = {
            'column_name': self.target_column,
            'unique_values': [str(v) for v in unique_values if pd.notna(v)],
            'value_counts': target_col.value_counts().to_dict(),
            'missing_count': int(target_col.isnull().sum()),
            'missing_percentage': round((target_col.isnull().sum() / len(target_col)) * 100, 2)
        }
        
        # Determine if binary, multiclass, or regression
        if len(unique_values) == 2:
            target_analysis['type'] = 'binary_classification'
            # Check for class imbalance
            value_counts = target_col.value_counts()
            minority_class_pct = (value_counts.min() / value_counts.sum()) * 100
            target_analysis['class_balance'] = {
                'minority_class_percentage': round(minority_class_pct, 2),
                'is_imbalanced': minority_class_pct < 30
            }
            
            if minority_class_pct < 10:
                self.validation_results['warnings'].append(
                    f"Severe class imbalance detected: {minority_class_pct:.1f}% minority class"
                )
        elif len(unique_values) <= 10:
            target_analysis['type'] = 'multiclass_classification'
        else:
            target_analysis['type'] = 'regression'
        
        self.validation_results['target_analysis'] = target_analysis
        
        # Check for missing target values
        if target_analysis['missing_count'] > 0:
            self.validation_results['errors'].append(
                f"Target column '{self.target_column}' has {target_analysis['missing_count']} missing values"
            )
    
    def validate_mandatory_combinations(self):
        """Check for logical data combinations that should exist"""
        combinations = []
        
        # Example: Check for employment status vs exit date patterns
        for col in self.categorical_cols:
            if any(keyword in col.lower() for keyword in ['status', 'exit', 'left', 'active', 'current']):
                # Check for patterns that might indicate data quality issues
                status_counts = self.df[col].value_counts()
                combinations.append({
                    'column': col,
                    'pattern': 'status_check',
                    'values': status_counts.to_dict(),
                    'suggestion': f"Review {col} for data consistency"
                })
        
        # Check for date consistency
        date_cols_sample = [col for col in self.date_cols if col in self.df.columns]
        if len(date_cols_sample) >= 2:
            combinations.append({
                'pattern': 'date_consistency',
                'columns': date_cols_sample,
                'suggestion': 'Verify date field relationships and chronological order'
            })
        
        self.validation_results['mandatory_combinations'] = combinations
    
    def generate_recommendations(self):
        """Generate actionable recommendations"""
        recommendations = []
        
        # Data quality recommendations
        quality_pct = self.validation_results['overall_quality']['completeness_percentage']
        if quality_pct < 85:
            recommendations.append({
                'category': 'data_quality',
                'priority': 'high',
                'message': 'Consider data cleaning and imputation strategies for missing values'
            })
        
        # Duplicate handling
        duplicate_count = self.validation_results['overall_quality']['duplicate_rows']
        if duplicate_count > 0:
            recommendations.append({
                'category': 'duplicates',
                'priority': 'medium',
                'message': f'Remove or investigate {duplicate_count} duplicate rows'
            })
        
        # Target column recommendations
        if self.target_column and 'class_balance' in self.validation_results['target_analysis']:
            if self.validation_results['target_analysis']['class_balance']['is_imbalanced']:
                recommendations.append({
                    'category': 'class_balance',
                    'priority': 'high',
                    'message': 'Consider resampling techniques for imbalanced target classes'
                })
        
        # Column-specific recommendations
        for col, info in self.validation_results['missing_data'].items():
            if info['missing_percentage'] > 30:
                recommendations.append({
                    'category': 'feature_engineering',
                    'priority': 'medium',
                    'message': f"Column '{col}' may need imputation or removal due to high missing rate"
                })
        
        self.validation_results['recommendations'] = recommendations
    
    def run_validation(self):
        """Run complete validation suite"""
        print("Starting data validation...")
        
        self.validate_overall_quality()
        self.validate_missing_data()
        self.validate_data_types()
        self.validate_target_column()
        self.validate_mandatory_combinations()
        self.generate_recommendations()
        
        # Add metadata
        self.validation_results['metadata'] = {
            'validation_timestamp': datetime.now().isoformat(),
            'script_version': '1.0.0'
        }
        
        print("Data validation completed!")
        return self.validation_results


def validate_data_from_file(file_path, target_column=None):
    """
    Main function to validate data from uploaded file
    
    Args:
        file_path: Path to the uploaded file
        target_column: Optional target column name
    
    Returns:
        dict: Validation results
    """
    try:
        # Read the file
        if file_path.lower().endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.lower().endswith(('.xlsx', '.xls')):
            df = pd.read_excel(file_path)
        else:
            return {
                'success': False,
                'error': 'Unsupported file format'
            }
        
        # Auto-detect target column if not provided
        if not target_column:
            # Look for common target column names
            target_candidates = ['target', 'label', 'y', 'outcome', 'churn', 'attrition', 'left', 'exit']
            for col in df.columns:
                if col.lower() in target_candidates:
                    target_column = col
                    break
        
        # Create validator and run validation
        validator = DataValidator(df, target_column)
        results = validator.run_validation()
        
        return {
            'success': True,
            'validation_results': results
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


def main():
    """CLI entry point for data validation"""
    if len(sys.argv) < 2:
        print(json.dumps({
            'success': False,
            'error': 'Missing required argument: file_path'
        }))
        sys.exit(1)
    
    file_path = sys.argv[1]
    target_column = sys.argv[2] if len(sys.argv) > 2 else None
    
    result = validate_data_from_file(file_path, target_column)
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()