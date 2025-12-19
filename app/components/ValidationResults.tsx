'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ValidationResult {
  overall_quality: {
    total_rows: number;
    total_columns: number;
    missing_cells: number;
    completeness_percentage: number;
    duplicate_rows: number;
    unique_rows: number;
    quality_level: string;
  };
  missing_data: Record<string, {
    missing_count: number;
    missing_percentage: number;
    data_type: string;
  }>;
  data_types: {
    numeric_columns: number;
    categorical_columns: number;
    date_columns: number;
    column_details: Record<string, {
      data_type: string;
      unique_values: number;
      uniqueness_ratio: number;
      suggestion?: string;
    }>;
  };
  target_analysis: {
    column_name?: string;
    unique_values?: string[];
    value_counts?: Record<string, number>;
    missing_count?: number;
    missing_percentage?: number;
    type?: string;
    class_balance?: {
      minority_class_percentage: number;
      is_imbalanced: boolean;
    };
  } | { status: string };
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    message: string;
  }>;
  warnings: string[];
  errors: string[];
  metadata: {
    validation_timestamp: string;
    script_version: string;
  };
}

interface ValidationResultsProps {
  validationResults: ValidationResult;
  fileName: string;
  onProceed: () => void;
  onReject: () => void;
  isLoading?: boolean;
}

export default function ValidationResults({
  validationResults,
  fileName,
  onProceed,
  onReject,
  isLoading = false
}: ValidationResultsProps) {
  const { overall_quality, missing_data, target_analysis, recommendations, warnings, errors } = validationResults;

  const getQualityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const hasIssues = errors.length > 0 || warnings.length > 0 || 
    recommendations.some(r => r.priority === 'high');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur-sm p-6 space-y-6"
    >
      {/* Header */}
      <div className="border-b border-gray-700/50 pb-4">
        <h3 className="text-xl font-bold text-white mb-2">
          Data Validation Results
        </h3>
        <p className="text-gray-400">File: {fileName}</p>
      </div>

      {/* Overall Quality */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Data Quality Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {overall_quality.total_rows.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Rows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {overall_quality.total_columns}
            </div>
            <div className="text-sm text-gray-400">Columns</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {overall_quality.completeness_percentage}%
            </div>
            <div className="text-sm text-gray-400">Complete Data</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${getQualityColor(overall_quality.quality_level)}`}>
              {overall_quality.quality_level}
            </div>
            <div className="text-sm text-gray-400">Quality Level</div>
          </div>
        </div>
        
        {overall_quality.duplicate_rows > 0 && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="text-yellow-300 text-sm">
              ⚠️ Found {overall_quality.duplicate_rows} duplicate rows
            </div>
          </div>
        )}
      </div>

      {/* Target Analysis */}
      {'column_name' in target_analysis && target_analysis.column_name && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Target Variable Analysis</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Target Column:</span>
              <span className="text-white font-medium">{target_analysis.column_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Prediction Type:</span>
              <span className="text-white font-medium capitalize">
                {target_analysis.type?.replace('_', ' ')}
              </span>
            </div>
            {target_analysis.class_balance && (
              <div className="flex justify-between">
                <span className="text-gray-400">Class Balance:</span>
                <span className={`font-medium ${target_analysis.class_balance.is_imbalanced ? 'text-yellow-400' : 'text-green-400'}`}>
                  {target_analysis.class_balance.is_imbalanced ? 'Imbalanced' : 'Balanced'}
                  {target_analysis.class_balance.is_imbalanced && 
                    ` (${target_analysis.class_balance.minority_class_percentage.toFixed(1)}% minority)`
                  }
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Missing Data Issues */}
      {Object.keys(missing_data).length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">Missing Data Analysis</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {Object.entries(missing_data)
              .sort(([,a], [,b]) => b.missing_percentage - a.missing_percentage)
              .slice(0, 5)
              .map(([column, info]) => (
                <div key={column} className="flex justify-between items-center">
                  <span className="text-gray-400 truncate">{column}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded text-xs ${
                      info.missing_percentage > 50 ? 'bg-red-500/20 text-red-300' :
                      info.missing_percentage > 20 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {info.missing_percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))
            }
            {Object.keys(missing_data).length > 5 && (
              <div className="text-center text-gray-500 text-sm">
                +{Object.keys(missing_data).length - 5} more columns with missing data
              </div>
            )}
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-red-300 mb-3">❌ Critical Issues</h4>
          <ul className="space-y-2">
            {errors.map((error, index) => (
              <li key={index} className="text-red-200 text-sm">• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-yellow-300 mb-3">⚠️ Warnings</h4>
          <ul className="space-y-2">
            {warnings.map((warning, index) => (
              <li key={index} className="text-yellow-200 text-sm">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-3">💡 Recommendations</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium uppercase">
                    {rec.priority} Priority
                  </span>
                  <span className="text-xs opacity-75 capitalize">
                    {rec.category.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm">{rec.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700/50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onProceed}
          disabled={isLoading || errors.length > 0}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
            errors.length > 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : errors.length > 0 ? (
            'Cannot Proceed - Fix Errors First'
          ) : hasIssues ? (
            'Proceed Despite Issues'
          ) : (
            'Proceed with Report Generation'
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReject}
          disabled={isLoading}
          className="flex-1 sm:flex-initial px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all"
        >
          Upload Different File
        </motion.button>
      </div>

      {/* Validation Summary */}
      <div className="text-center">
        <div className="text-xs text-gray-500">
          Validation completed at {new Date(validationResults.metadata.validation_timestamp).toLocaleString()}
        </div>
      </div>
    </motion.div>
  );
}