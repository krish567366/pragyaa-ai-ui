'use client';

import React from 'react';
import CaseStudyTemplate from '../CaseStudyTemplate';

export default function DelayedArrivalCaseStudy() {
  return (
    <CaseStudyTemplate
      title="Healthcare Delayed Arrival Prediction"
      description="Optimize patient flow by predicting and managing delayed arrivals with 88% accuracy"
      useCase={`Our Delayed Arrival Prediction model helps healthcare facilities manage patient flow more effectively by forecasting potential delays in patient arrivals. This enables better resource allocation, reduced waiting times, and improved patient satisfaction.

The system analyzes various factors including traffic patterns, weather conditions, and patient history to predict arrival delays and adjust scheduling accordingly.`}
      methodology={`We employ a sophisticated prediction approach:

1. Real-time Data Integration: Combine multiple data sources
2. Pattern Analysis: Historical delay patterns
3. Predictive Models:
   - Time Series Analysis
   - Machine Learning Classification
   - Traffic Pattern Integration
4. Dynamic Scheduling: Real-time adjustments
5. Continuous Learning: Model adaptation`}
      dataRequired={[
        "Patient appointment history",
        "Historical arrival patterns",
        "Traffic data and patterns",
        "Weather information",
        "Patient location data",
        "Transportation method",
        "Appointment time preferences",
        "Previous delay patterns",
        "Route information",
        "Facility capacity data"
      ]}
      timeline={`Project implementation timeline:

1. Data Collection & Analysis: 2-3 weeks
2. Model Development: 3-4 weeks
3. System Integration: 2-3 weeks
4. Testing & Validation: 2 weeks
5. Pilot Program: 4 weeks
6. Full Deployment: 2 weeks

Total Timeline: 15-18 weeks`}
      goLive={`Systematic implementation process:

1. System Integration: Connect with scheduling systems
2. Staff Training: Front desk and scheduling team training
3. Patient Communication Setup: Configure notification systems
4. Pilot Phase: Test with selected departments
5. Performance Monitoring: Track prediction accuracy
6. Full Implementation: Facility-wide deployment
7. Continuous Improvement: Regular updates based on new data`}
    />
  );
}