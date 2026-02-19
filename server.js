const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Route files
const mathRoutes = require('./routes/mathRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/math', mathRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send('NeuroMath API is running (File Store Mode)');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
