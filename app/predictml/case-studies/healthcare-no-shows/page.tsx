'use client';

import React from 'react';
import CaseStudyTemplate from '../CaseStudyTemplate';

export default function NoShowsCaseStudy() {
  return (
    <CaseStudyTemplate
      title="Healthcare No-Show Prediction"
      description="Reduce missed appointments by up to 45% with our advanced ML prediction model"
      useCase={`Our Healthcare No-Show Prediction model helps healthcare providers significantly reduce missed appointments by identifying patients most likely to miss their scheduled visits. This enables proactive interventions and optimized scheduling, leading to improved resource utilization and patient care.

The model analyzes historical appointment data along with various patient-specific factors to predict the probability of a no-show, allowing staff to take preventive measures such as additional reminders, confirmations, or overbooking strategies.`}
      methodology={`Our approach combines multiple machine learning techniques:

1. Data Preprocessing: Clean and standardize historical appointment data
2. Feature Engineering: Extract relevant patterns from appointment history
3. Model Development: Implement ensemble learning combining:
   - Gradient Boosting
   - Random Forest
   - Neural Networks
4. Model Validation: Cross-validation with historical data
5. Continuous Learning: Model retraining with new data`}
      dataRequired={[
        "Patient demographic information (age, gender, location)",
        "Appointment history and previous no-show records",
        "Appointment details (date, time, department, provider)",
        "Weather data for appointment dates",
        "Distance from patient's location to facility",
        "Insurance and payment information",
        "Appointment type and duration",
        "Previous cancellation patterns"
      ]}
      timeline={`Typical implementation timeline:

1. Data Collection & Preparation: 2-3 weeks
2. Model Development & Training: 3-4 weeks
3. Integration & Testing: 2-3 weeks
4. Pilot Program: 4 weeks
5. Full Deployment: 2 weeks

Total Timeline: 13-16 weeks`}
      goLive={`Our structured go-live process ensures smooth implementation:

1. System Integration: Connect with your scheduling system
2. Staff Training: Comprehensive training sessions
3. Pilot Phase: Start with selected departments
4. Performance Monitoring: Track key metrics
5. Full Rollout: Systematic deployment across all departments
6. Ongoing Support: Continuous monitoring and optimization`}
    />
  );
}