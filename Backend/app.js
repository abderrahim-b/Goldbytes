require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/db');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
