require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

app.use('/api/products', require('./routes/productRoutes'));

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
});