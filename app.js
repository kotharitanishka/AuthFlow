const express = require('express');
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedule');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes );
app.use('/api', scheduleRoutes);

module.exports = app;