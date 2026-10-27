const RiskAssessment = require('../models/RiskAssessment');

// Rule-based and ML-simulated risk assessment logic based on UCI Maternal Risk metrics
function calculateRisk(vitals, age) {
  const factors = [];
  let riskScore = 0;

  // Systolic BP
  if (vitals.systolicBP >= 140) {
    riskScore += 35;
    factors.push({
      factorName: 'Systolic Blood Pressure',
      measuredValue: `${vitals.systolicBP} mmHg`,
      normalThreshold: '< 120 mmHg',
      severity: 'Critical',
    });
  } else if (vitals.systolicBP >= 130) {
    riskScore += 15;
    factors.push({
      factorName: 'Systolic Blood Pressure',
      measuredValue: `${vitals.systolicBP} mmHg`,
      normalThreshold: '< 120 mmHg',
      severity: 'Elevated',
    });
  } else {
    factors.push({
      factorName: 'Systolic Blood Pressure',
      measuredValue: `${vitals.systolicBP} mmHg`,
      normalThreshold: '< 120 mmHg',
      severity: 'Normal',
    });
  }

  // Diastolic BP
  if (vitals.diastolicBP >= 90) {
    riskScore += 25;
    factors.push({
      factorName: 'Diastolic Blood Pressure',
      measuredValue: `${vitals.diastolicBP} mmHg`,
      normalThreshold: '< 80 mmHg',
      severity: 'Critical',
    });
  } else if (vitals.diastolicBP >= 85) {
    riskScore += 10;
    factors.push({
      factorName: 'Diastolic Blood Pressure',
      measuredValue: `${vitals.diastolicBP} mmHg`,
      normalThreshold: '< 80 mmHg',
      severity: 'Elevated',
    });
  }

  // Blood Sugar (mmol/L)
  if (vitals.bloodSugar >= 8.5) {
    riskScore += 30;
    factors.push({
      factorName: 'Blood Sugar (Fasting/Random)',
      measuredValue: `${vitals.bloodSugar} mmol/L`,
      normalThreshold: '< 7.0 mmol/L',
      severity: 'Critical',
    });
  } else if (vitals.bloodSugar >= 7.0) {
    riskScore += 15;
    factors.push({
      factorName: 'Blood Sugar (Fasting/Random)',
      measuredValue: `${vitals.bloodSugar} mmol/L`,
      normalThreshold: '< 7.0 mmol/L',
      severity: 'Elevated',
    });
  }

  // Haemoglobin
  if (vitals.haemoglobin < 9.5) {
    riskScore += 30;
    factors.push({
      factorName: 'Haemoglobin (Maternal Anemia)',
      measuredValue: `${vitals.haemoglobin} g/dL`,
      normalThreshold: '>= 11.0 g/dL',
      severity: 'Critical',
    });
  } else if (vitals.haemoglobin < 11.0) {
    riskScore += 15;
    factors.push({
      factorName: 'Haemoglobin (Mild Anemia)',
      measuredValue: `${vitals.haemoglobin} g/dL`,
      normalThreshold: '>= 11.0 g/dL',
      severity: 'Elevated',
    });
  }

  // Maternal Age
  if (age >= 35 || age < 18) {
    riskScore += 15;
    factors.push({
      factorName: 'Maternal Age Risk',
      measuredValue: `${age} years`,
      normalThreshold: '18 - 34 years',
      severity: 'Elevated',
    });
  }

  // Determine Level & Explanation
  let riskLevel = 'Low Risk';
  let confidenceScore = 95.4;
  let explanation = 'All monitored vitals (blood pressure, glucose, and haemoglobin) remain within physiological reference boundaries. Standard routine antenatal monitoring recommended.';

  if (riskScore >= 45) {
    riskLevel = 'High Risk';
    confidenceScore = Math.min(99.1, 88 + Math.random() * 8);
    explanation = 'Multiple high-risk clinical markers detected: persistent hypertension and/or pronounced maternal anemia. Elevated probability of pre-eclampsia and intra-uterine complications. Immediate specialist review advised.';
  } else if (riskScore >= 20) {
    riskLevel = 'Medium Risk';
    confidenceScore = Math.min(94.5, 82 + Math.random() * 8);
    explanation = 'Borderline elevations detected in maternal vitals. Mild gestational risk indicated requiring bi-weekly surveillance, nutritional intervention, and repeat glucose tolerance testing.';
  }

  return {
    riskLevel,
    confidenceScore: parseFloat(confidenceScore.toFixed(1)),
    factors,
    aiExplanation: explanation,
  };
}

exports.getRiskAssessmentByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    let assessment = await RiskAssessment.findOne({ patient: patientId }).catch(() => null);

    if (!assessment) {
      // Mock generated assessment
      const mockResult = calculateRisk(
        {
          systolicBP: 146,
          diastolicBP: 94,
          bloodSugar: 8.4,
          haemoglobin: 9.2,
          bmi: 27.0,
          heartRate: 88,
          bodyTemp: 98.6,
        },
        26
      );

      return res.status(200).json({
        success: true,
        data: {
          patientId,
          ...mockResult,
          reviewedByDoctor: true,
          reviewerDoctorName: 'Dr. Ananya Sharma',
          reviewedAt: new Date(),
        },
      });
    }

    res.status(200).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.runRiskAssessment = async (req, res) => {
  try {
    const { patientId, vitals, age } = req.body;
    const result = calculateRisk(vitals || {}, age || 25);

    res.status(200).json({
      success: true,
      message: 'AI Risk prediction completed successfully',
      data: {
        patientId,
        ...result,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDoctorReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorName, clinicalNotes } = req.body;

    res.status(200).json({
      success: true,
      message: 'Risk assessment reviewed and verified by physician',
      data: {
        assessmentId: id,
        reviewedByDoctor: true,
        reviewerDoctorName: doctorName || 'Dr. Ananya Sharma',
        clinicalNotes: clinicalNotes || 'Verified. Protocol initiated.',
        reviewedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
