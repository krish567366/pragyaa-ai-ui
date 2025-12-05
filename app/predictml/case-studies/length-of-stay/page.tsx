'use client';

import React from 'react';
import CaseStudyTemplate from '../CaseStudyTemplate';

export default function LengthOfStayCaseStudy() {
  return (
    <CaseStudyTemplate
      title="Healthcare Length of Stay Prediction"
      description="Optimize hospital resource allocation with 92% accurate patient stay duration predictions"
      useCase={`Our Length of Stay (LOS) Prediction model helps healthcare facilities optimize resource allocation and improve patient flow by accurately forecasting how long patients will need to stay in the hospital. This enables better bed management, staff scheduling, and resource planning.

The model considers multiple factors including patient condition, treatment type, and historical data to provide accurate predictions at the time of admission.`}
      methodology={`We utilize a sophisticated multi-model approach:

1. Data Integration: Combine EHR and admission data
2. Clinical Pattern Analysis: Extract relevant medical indicators
3. Model Architecture:
   - Time Series Analysis
   - Gradient Boosting Models
   - Deep Learning Networks
4. Risk Stratification: Patient complexity scoring
5. Dynamic Updates: Real-time prediction adjustments`}
      dataRequired={[
        "Patient demographics and medical history",
        "Admission diagnosis and severity",
        "Treatment plan and procedures",
        "Vital signs and lab results",
        "Medication requirements",
        "Comorbidity information",
        "Historical length of stay data",
        "Department and specialty information",
        "Resource availability data",
        "Care team assignments"
      ]}
      timeline={`Project implementation schedule:

1. Data Integration & Preparation: 3-4 weeks
2. Model Development: 4-5 weeks
3. System Integration: 2-3 weeks
4. Testing & Validation: 3 weeks
5. Pilot Implementation: 4 weeks
6. Full Deployment: 2-3 weeks

Total Timeline: 18-22 weeks`}
      goLive={`Systematic deployment process:

1. System Integration: Connect with hospital EHR system
2. Staff Training: Sessions for medical and administrative staff
3. Workflow Integration: Embed in admission processes
4. Pilot Phase: Initial deployment in selected units
5. Performance Monitoring: Track prediction accuracy
6. Full Scale Deployment: Hospital-wide implementation
7. Continuous Optimization: Regular model updates and refinements`}
    />
  );
}