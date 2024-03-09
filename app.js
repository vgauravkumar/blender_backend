const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config('.env');
const { starterFiles } = require('./src/middleware/starter');
const logger = require('./src/services/logger');

/* ------------------------ Configuration middlewares ----------------------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS middleware
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory to store uploaded files
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

/* ---------------------- Declare global variables here --------------------- */
global["Active DB Connections"] = 0; // Database connection count

/* ---------------------------- User middlewares ---------------------------- */
app.use(starterFiles);
app.use('/models', express.static('models')); // Serve models folder
app.use(require('./src/routes/handler'));

// Define a route to handle file uploads
app.post('/api/model', upload.single('file'), (req, res) => {
    // The file has been uploaded and stored on the server
    console.log(req.file.filename);
    const { arr } = require('./src/controller/getModels');
    arr.push({file_name: req.file.filename});
    console.log('File uploaded successfully');
    return res.status(200).json({
        message: 'File uploaded successfully'
    });
});

app.get('/api/model/download', (req, res) => {
    const {fileName} = req.query;
    // Change 'example.pdf' to your file's path
    const filePath = path.join(__dirname, 'uploads', fileName);
    // Send the file as a response
    res.sendFile(filePath);
});

// Server listens at this port
app.listen(process.env.PORT, () => {
    logger.info(`Server starting on port ${process.env.PORT}`);
});