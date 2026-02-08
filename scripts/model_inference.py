"""
Model Inference Script
Load trained model and make predictions
"""

import sys
import json
import pandas as pd
import joblib
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

def load_model(model_path):
    """Load trained PyCaret model"""
    try:
        from pycaret.classification import load_model as load_clf_model
        return load_clf_model(model_path.replace('.pkl', '')), 'classification'
    except:
        try:
            from pycaret.regression import load_model as load_reg_model
            return load_reg_model(model_path.replace('.pkl', '')), 'regression'
        except Exception as e:
            raise Exception(f"Failed to load model: {str(e)}")

def make_predictions(model_path, input_data):
    """
    Make predictions using trained model
    
    Args:
        model_path: Path to saved model
        input_data: Dictionary or DataFrame with input features
    
    Returns:
        dict: Predictions and probabilities
    """
    try:
        # Load model
        model, problem_type = load_model(model_path)
        
        # Convert input to DataFrame if dict
        if isinstance(input_data, dict):
            df = pd.DataFrame([input_data])
        elif isinstance(input_data, list):
            df = pd.DataFrame(input_data)
        else:
            df = input_data
        
        # Make predictions
        if problem_type == 'classification':
            from pycaret.classification import predict_model
            predictions = predict_model(model, data=df)
            
            # Get prediction column name (usually 'prediction_label' or 'Label')
            pred_col = 'prediction_label' if 'prediction_label' in predictions.columns else 'Label'
            
            results = {
                'predictions': predictions[pred_col].tolist(),
                'problem_type': problem_type
            }
            
            # Add probabilities if available
            prob_cols = [col for col in predictions.columns if col.startswith('prediction_score') or col.startswith('Score')]
            if prob_cols:
                results['probabilities'] = predictions[prob_cols].to_dict('records')
            
        else:  # regression
            from pycaret.regression import predict_model
            predictions = predict_model(model, data=df)
            
            # Get prediction column name (usually 'prediction_label' or 'Label')
            pred_col = 'prediction_label' if 'prediction_label' in predictions.columns else 'Label'
            
            results = {
                'predictions': predictions[pred_col].tolist(),
                'problem_type': problem_type
            }
        
        return {
            'success': True,
            'results': results,
            'input_shape': df.shape
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'error_type': type(e).__name__
        }

def main():
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False,
            'error': 'Usage: python model_inference.py <model_path> <input_json>'
        }))
        sys.exit(1)
    
    model_path = sys.argv[1]
    input_json = sys.argv[2]
    
    # Parse input data
    try:
        input_data = json.loads(input_json)
    except json.JSONDecodeError as e:
        print(json.dumps({
            'success': False,
            'error': f'Invalid JSON input: {str(e)}'
        }))
        sys.exit(1)
    
    # Make predictions
    result = make_predictions(model_path, input_data)
    
    # Output result as JSON
    print(json.dumps(result, indent=2))
    
    if result['success']:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == '__main__':
    main()
