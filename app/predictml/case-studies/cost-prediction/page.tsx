'use client';

import React from 'react';
import CaseStudyTemplate from '../CaseStudyTemplate';

export default function CostPredictionCaseStudy() {
  return (
    <CaseStudyTemplate
      title="Healthcare Cost Prediction"
      description="Forecast healthcare costs with 90% accuracy using advanced ML algorithms"
      useCase={`Our Healthcare Cost Prediction model enables healthcare providers and insurers to accurately forecast patient care costs, supporting better financial planning and resource allocation. The system analyzes historical cost data, patient characteristics, and treatment patterns to predict future healthcare expenses.

This predictive model helps in budget planning, risk assessment, and developing cost-effective treatment strategies while maintaining high-quality care standards.`}
      methodology={`We implement a comprehensive analytical approach:

1. Historical Data Analysis: Process past cost patterns
2. Multi-factor Modeling: Consider various cost drivers
3. Predictive Framework:
   - Regression Analysis
   - Neural Networks
   - Random Forest Models
4. Cost Pattern Recognition: Identify key cost factors
5. Dynamic Cost Modeling: Real-time adjustments`}
      dataRequired={[
        "Historical treatment costs",
        "Patient demographic information",
        "Diagnosis and procedure codes",
        "Length of stay data",
        "Resource utilization records",
        "Insurance and billing information",
        "Medication and supply costs",
        "Provider-specific cost data",
        "Facility utilization patterns",
        "Treatment outcome data"
      ]}
      timeline={`Implementation schedule:

1. Data Collection & Analysis: 3-4 weeks
2. Model Development: 4-5 weeks
3. Financial System Integration: 3-4 weeks
4. Testing & Validation: 3 weeks
5. Pilot Program: 4 weeks
6. Full Implementation: 2-3 weeks

Total Timeline: 19-23 weeks`}
      goLive={`Structured deployment approach:

1. System Integration: Connect with financial and EHR systems
2. Staff Training: Finance and administrative team training
3. Cost Monitoring Setup: Configure tracking systems
4. Pilot Phase: Initial deployment in selected departments
5. Validation Period: Verify prediction accuracy
6. Full Deployment: Organization-wide implementation
7. Ongoing Optimization: Regular model updates and cost pattern analysis`}
    />
  );
}