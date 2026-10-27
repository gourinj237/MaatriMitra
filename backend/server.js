const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB (with graceful fallback)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/risk', require('./routes/riskRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/newborns', require('./routes/newbornRoutes'));
app.use('/api/pregnancy-history', require('./routes/previousPregnancyRoutes'));

// Health check and root route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'MaatriMitra AI - Doctor & Hospital Administrator Backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>MaatriMitra AI - Clinical & Admin API</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #F5F3FF; color: #4C1D95; padding: 2rem; }
          .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15); max-width: 600px; margin: auto; }
          h1 { color: #8B5CF6; }
          code { background: #EDE9FE; padding: 0.2rem 0.4rem; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>💜 MaatriMitra AI API</h1>
          <p>Clinical Decision Support & Hospital Administrator Backend Service</p>
          <p>Status: <strong>Running & Ready</strong></p>
          <p>Endpoints available under <code>/api/*</code></p>
        </div>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🩺 MaatriMitra AI Doctor & Admin API Server`);
  console.log(`🚀 Running at http://localhost:${PORT}`);
  console.log(`💜 Theme Color: #8B5CF6 (Vivid Violet)`);
  console.log(`====================================================`);
});
