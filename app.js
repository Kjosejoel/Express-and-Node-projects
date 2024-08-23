const express = require('express');
const path = require('path');
const app = express();
const tasks = require('./Routes/Tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// Serve static files from 'public/frontend'
app.use(express.static(path.join(__dirname, 'public', 'Frontend')));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Frontend', 'index.html'));
});

app.use(express.json());
app.use('/api/v1/tasks/', tasks);

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.error("Error occurred while connecting to the database:", error);
    }
};

start();
