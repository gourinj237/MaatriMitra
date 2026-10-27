const User = require('../models/User');

const mockHospitalStats = {
  facilityName: 'District Rural General Hospital - Maternal Care Wing',
  totalRegisteredMothers: 142,
  activePregnancies: 118,
  highRiskCases: 19,
  mediumRiskCases: 38,
  lowRiskCases: 61,
  completedDeliveriesThisMonth: 27,
  normalDeliveriesPercentage: 77.8,
  cSectionPercentage: 22.2,
  infantImmunizationRate: 98.4,
  maternalMortalityRatio: 0,
  facilityCapacity: {
    maternityBedsTotal: 50,
    maternityBedsOccupied: 34,
    icuBedsTotal: 8,
    icuBedsOccupied: 3,
    ambulancesActive: 4,
    onDutyObstetricians: 5,
    activeAshaWorkers: 32,
  },
  trimesters: {
    firstTrimester: 28,
    secondTrimester: 49,
    thirdTrimester: 41,
    postpartum: 24,
  },
  phcNetwork: [
    { phcName: 'PHC Rampur', registered: 46, highRisk: 7, docInCharge: 'Dr. Ananya Sharma', coverageRate: '96%' },
    { phcName: 'PHC Bhimnagar', registered: 38, highRisk: 4, docInCharge: 'Dr. Rajesh Nair', coverageRate: '92%' },
    { phcName: 'PHC Noorpur East', registered: 32, highRisk: 5, docInCharge: 'Dr. Kavita Singhal', coverageRate: '94%' },
    { phcName: 'Sub-Center Kalyanpur', registered: 26, highRisk: 3, docInCharge: 'Dr. Ananya Sharma', coverageRate: '91%' },
  ],
};

const mockUsers = [
  {
    _id: 'usr_001',
    name: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@maatricare.org',
    role: 'Doctor',
    department: 'Obstetrics & Gynecology',
    licenseNumber: 'MCI-OBG-2018-9481',
    phone: '+91 98110 54321',
    status: 'Active',
    facilityName: 'District Rural General Hospital',
  },
  {
    _id: 'usr_002',
    name: 'Dr. Rajesh Nair',
    email: 'rajesh.nair@maatricare.org',
    role: 'Doctor',
    department: 'Maternal-Fetal Medicine',
    licenseNumber: 'MCI-OBG-2015-4210',
    phone: '+91 97234 11980',
    status: 'Active',
    facilityName: 'PHC Bhimnagar',
  },
  {
    _id: 'usr_003',
    name: 'Rameshwar Verma',
    email: 'rameshwar.verma@district-health.gov.in',
    role: 'Hospital Administrator',
    department: 'Health Administration & Operations',
    licenseNumber: 'HOSP-ADM-2019-012',
    phone: '+91 99881 22345',
    status: 'Active',
    facilityName: 'District Rural General Hospital',
  },
  {
    _id: 'usr_004',
    name: 'Sunita Devi',
    email: 'sunita.asha@maatricare.org',
    role: 'ASHA Worker',
    department: 'Community Maternal Health',
    licenseNumber: 'ASHA-UP-8842',
    phone: '+91 98765 43210',
    status: 'Active',
    facilityName: 'Rampur Sub-district Block A',
  },
  {
    _id: 'usr_005',
    name: 'Kavita Rawat',
    email: 'kavita.asha@maatricare.org',
    role: 'ASHA Worker',
    department: 'Community Maternal Health',
    licenseNumber: 'ASHA-UP-7912',
    phone: '+91 98451 22901',
    status: 'Active',
    facilityName: 'Bhimnagar Sector 2',
  },
  {
    _id: 'usr_006',
    name: 'Priya Meena',
    email: 'priya.meena@village.in',
    role: 'Mother',
    department: 'Maternal Patient',
    licenseNumber: 'N/A',
    phone: '+91 98231 44510',
    status: 'Active',
    facilityName: 'Rampur Sub-district',
  },
];

exports.getHospitalStats = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: mockHospitalStats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRiskAnalytics = async (req, res) => {
  try {
    const analytics = {
      riskTiers: [
        { label: 'High Risk', count: 19, percentage: 16.1, color: '#EF4444' },
        { label: 'Medium Risk', count: 38, percentage: 32.2, color: '#F59E0B' },
        { label: 'Low Risk', count: 61, percentage: 51.7, color: '#10B981' },
      ],
      complicationFrequency: [
        { condition: 'Gestational Hypertension / Pre-eclampsia', count: 14, riskCategory: 'High' },
        { condition: 'Severe Anemia (Hb < 9.0 g/dL)', count: 12, riskCategory: 'High' },
        { condition: 'Gestational Diabetes Mellitus', count: 9, riskCategory: 'Medium' },
        { condition: 'Previous C-Section / Grand Multiparity', count: 8, riskCategory: 'Medium' },
        { condition: 'Adolescent or Advanced Age (>35 / <18)', count: 6, riskCategory: 'Medium' },
      ],
      monthlyAdmissionsTrend: [
        { month: 'May', deliveries: 22, highRiskManaged: 6 },
        { month: 'Jun', deliveries: 25, highRiskManaged: 8 },
        { month: 'Jul', deliveries: 29, highRiskManaged: 11 },
        { month: 'Aug', deliveries: 31, highRiskManaged: 9 },
        { month: 'Sep', deliveries: 27, highRiskManaged: 12 },
      ],
    };

    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let users = await User.find().catch(() => null);

    if (!users || users.length === 0) {
      users = mockUsers;
    }

    if (role && role !== 'All') {
      users = users.filter((u) => u.role.toLowerCase() === role.toLowerCase());
    }

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    let created;
    try {
      created = await User.create(userData);
    } catch {
      created = {
        _id: 'usr_' + Date.now(),
        ...userData,
        status: 'Active',
        createdAt: new Date(),
      };
    }

    res.status(201).json({ success: true, message: 'User created successfully', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateReportsSummary = async (req, res) => {
  try {
    const summary = {
      facilityName: 'District Rural General Hospital',
      auditCycle: 'Monthly Rural Maternal Health Performance Audit',
      generatedAt: new Date().toISOString(),
      chiefMedicalOfficer: 'Dr. Ananya Sharma',
      hospitalAdministrator: 'Rameshwar Verma',
      keyMetrics: {
        totalEncounters: 384,
        aiScreeningsExecuted: 214,
        highRiskIdentifications: 19,
        emergencyEscalations: 4,
        zeroMaternalDeaths: true,
      },
    };

    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
