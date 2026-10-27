const User = require('../models/User');

// Mock fallback user if database is offline
const fallbackUser = {
  id: 'usr_doc_001',
  name: 'Dr. Ananya Sharma',
  email: 'ananya.sharma@maatricare.org',
  role: 'Doctor',
  department: 'Obstetrics & Maternal-Fetal Medicine',
  facilityName: 'District Rural General Hospital',
  licenseNumber: 'MCI-OBGYN-2018-9481',
  status: 'Active',
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check in DB if available
    let user = await User.findOne({ email }).catch(() => null);
    
    if (!user) {
      // Friendly fallback for demo/standalone mode
      return res.status(200).json({
        success: true,
        message: 'Logged in successfully (Demo Session)',
        user: {
          ...fallbackUser,
          email: email || fallbackUser.email,
          role: role || fallbackUser.role,
        },
        token: 'sample-jwt-token-maatricare-demo',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
      token: 'sample-jwt-token-maatricare-demo',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: fallbackUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
