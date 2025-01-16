require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrrorHandlingMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/auth-middleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: 'http://localhost', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router); 
app.use(errorMiddleware);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Error occurred during server startup:', error);
    }
};

start();
