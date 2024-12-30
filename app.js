const express = require('express');
const bodyParser = require('body-parser');
const rideRoutes = require('./routes/rideRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use('/api', rideRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
