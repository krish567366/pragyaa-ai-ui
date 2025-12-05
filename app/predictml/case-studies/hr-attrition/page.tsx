'use client';

import React from 'react';
import CaseStudyTemplate from '../CaseStudyTemplate';

export default function HRAttritionCaseStudy() {
  return (
    <CaseStudyTemplate
      title="HR Attrition Prediction"
      description="Predict and prevent employee turnover with up to 85% accuracy using advanced ML models"
      useCase={`Our HR Attrition Prediction model helps organizations proactively identify employees at risk of leaving, enabling timely interventions and retention strategies. This predictive model analyzes various workplace and employee-specific factors to forecast potential turnover risks.

The system provides actionable insights to HR teams and managers, allowing them to implement targeted retention programs and improve overall workforce stability.`}
      methodology={`We employ a comprehensive machine learning approach:

1. Data Integration: Combine HR data from multiple sources
2. Feature Engineering: Extract relevant employee behavior patterns
3. Model Development:
   - Random Forest Classification
   - XGBoost
   - Deep Neural Networks
4. Pattern Recognition: Identify key attrition indicators
5. Risk Scoring: Develop employee risk profiles`}
      dataRequired={[
        "Employee demographic data",
        "Performance review history",
        "Salary and compensation details",
        "Time in current role/position",
        "Work schedule and overtime data",
        "Project assignments and workload",
        "Training and development records",
        "Team structure and reporting relationships",
        "Employee engagement survey results",
        "Leave and absence patterns"
      ]}
      timeline={`Implementation timeline breakdown:

1. Data Collection & Analysis: 2-3 weeks
2. Model Development: 3-4 weeks
3. Integration with HR Systems: 2-3 weeks
4. Testing & Validation: 2 weeks
5. Pilot Program: 4 weeks
6. Full Implementation: 2 weeks

Total Timeline: 15-18 weeks`}
      goLive={`Structured implementation process:

1. System Integration: Connect with HRIS and other data sources
2. User Training: Sessions for HR team and managers
3. Dashboard Setup: Configure monitoring and reporting
4. Pilot Phase: Test with selected departments
5. Full Deployment: Systematic organization-wide rollout
6. Continuous Improvement: Regular model updates and refinements`}
    />
  );
}