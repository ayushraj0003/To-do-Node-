const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todoapp')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use Todo routes
app.use('/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
