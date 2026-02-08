"""
AutoML Model Training Script
Uses PyCaret for automated machine learning
"""

import sys
import json
import pandas as pd
import numpy as np
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

def log_progress(message, progress=None):
    """Log progress to stderr for tracking"""
    log_data = {
        'message': message,
        'progress': progress,
        'type': 'progress'
    }
    print(json.dumps(log_data), file=sys.stderr, flush=True)

def train_automl_model(data_path, target_column, problem_type='auto', output_dir='./models'):
    """
    Train an AutoML model using PyCaret
    
    Args:
        data_path: Path to CSV/Excel file
        target_column: Name of target column
        problem_type: 'classification', 'regression', or 'auto' (auto-detect)
        output_dir: Directory to save trained model
    
    Returns:
        dict: Training results and model information
    """
    try:
        log_progress("Loading dataset...", 5)
        
        # Load data
        if data_path.endswith('.csv'):
            df = pd.read_csv(data_path)
        else:
            df = pd.read_excel(data_path)
        
        log_progress(f"Loaded {len(df)} rows with {len(df.columns)} columns", 10)
        
        # Auto-detect problem type if not specified
        if problem_type == 'auto':
            if target_column not in df.columns:
                raise ValueError(f"Target column '{target_column}' not found in dataset")
            
            unique_values = df[target_column].nunique()
            total_values = len(df)
            
            # Heuristic: if unique values < 5% of total or < 20, treat as classification
            if unique_values < max(20, total_values * 0.05):
                problem_type = 'classification'
            else:
                problem_type = 'regression'
            
            log_progress(f"Auto-detected problem type: {problem_type}", 15)
        
        # Import appropriate module
        log_progress("Initializing AutoML environment...", 20)
        
        if problem_type == 'classification':
            from pycaret.classification import setup, compare_models, save_model, pull
            
            log_progress("Setting up classification experiment...", 25)
            exp = setup(
                data=df,
                target=target_column,
                session_id=42,
                verbose=False,
                silent=True,
                use_gpu=False,
                normalize=True,
                transformation=True,
                ignore_low_variance=True,
                remove_multicollinearity=True,
                multicollinearity_threshold=0.9,
                fix_imbalance=True if df[target_column].value_counts().min() / len(df) < 0.1 else False
            )
            
            log_progress("Training and comparing multiple models...", 40)
            best_model = compare_models(n_select=1, verbose=False)
            
            log_progress("Evaluating best model...", 80)
            results = pull()
            
        else:  # regression
            from pycaret.regression import setup, compare_models, save_model, pull
            
            log_progress("Setting up regression experiment...", 25)
            exp = setup(
                data=df,
                target=target_column,
                session_id=42,
                verbose=False,
                silent=True,
                use_gpu=False,
                normalize=True,
                transformation=True,
                ignore_low_variance=True,
                remove_multicollinearity=True,
                multicollinearity_threshold=0.9
            )
            
            log_progress("Training and comparing multiple models...", 40)
            best_model = compare_models(n_select=1, verbose=False)
            
            log_progress("Evaluating best model...", 80)
            results = pull()
        
        # Save model
        log_progress("Saving trained model...", 90)
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        dataset_id = Path(data_path).stem.split('_')[1] if '_' in Path(data_path).stem else 'model'
        model_path = f"{output_dir}/{dataset_id}_model"
        save_model(best_model, model_path)
        
        log_progress("Model training completed successfully!", 100)
        
        # Prepare results
        model_name = type(best_model).__name__
        
        # Get metrics from results dataframe
        if problem_type == 'classification':
            metrics = {
                'model_type': model_name,
                'problem_type': problem_type,
                'accuracy': float(results['Accuracy'].iloc[0]) if 'Accuracy' in results.columns else None,
                'auc': float(results['AUC'].iloc[0]) if 'AUC' in results.columns else None,
                'f1_score': float(results['F1'].iloc[0]) if 'F1' in results.columns else None,
                'precision': float(results['Prec.'].iloc[0]) if 'Prec.' in results.columns else None,
                'recall': float(results['Recall'].iloc[0]) if 'Recall' in results.columns else None,
            }
        else:
            metrics = {
                'model_type': model_name,
                'problem_type': problem_type,
                'r2_score': float(results['R2'].iloc[0]) if 'R2' in results.columns else None,
                'rmse': float(results['RMSE'].iloc[0]) if 'RMSE' in results.columns else None,
                'mae': float(results['MAE'].iloc[0]) if 'MAE' in results.columns else None,
                'mse': float(results['MSE'].iloc[0]) if 'MSE' in results.columns else None,
            }
        
        return {
            'success': True,
            'model_path': f"{model_path}.pkl",
            'model_name': model_name,
            'problem_type': problem_type,
            'target_column': target_column,
            'dataset_shape': df.shape,
            'metrics': metrics,
            'feature_count': len(df.columns) - 1,
            'training_samples': len(df)
        }
        
    except Exception as e:
        log_progress(f"Training failed: {str(e)}", 0)
        return {
            'success': False,
            'error': str(e),
            'error_type': type(e).__name__
        }

def main():
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False,
            'error': 'Usage: python automl_trainer.py <data_path> <target_column> [problem_type] [output_dir]'
        }))
        sys.exit(1)
    
    data_path = sys.argv[1]
    target_column = sys.argv[2]
    problem_type = sys.argv[3] if len(sys.argv) > 3 else 'auto'
    output_dir = sys.argv[4] if len(sys.argv) > 4 else './models'
    
    log_progress("Starting AutoML training...", 0)
    result = train_automl_model(data_path, target_column, problem_type, output_dir)
    
    # Output result as JSON to stdout
    print(json.dumps(result, indent=2))
    
    if result['success']:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()
