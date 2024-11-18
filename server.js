const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');

// get Port, file path, folderName and mongoURI
const { PORT = 4001,
    folderName = 'academic-license',
    mongoURI = "mongodb+srv://minkascharff:0kXcALRVpFwLoayY@cluster.pphl1c2.mongodb.net/academyLicense?retryWrites=true&w=majority" } = process.env;
const app = express();

mongoose.connect(mongoURI)
    .catch((err) => {
        console.error(err);
    });

require('dotenv').config();

// include these before other routes
app.options('*', cors());
app.use(cors());

app.use(bodyParser.json()); // parse application/json

app.use(requestLogger);     // enabling the request

app.use(require('./routes/users'));
app.use(require('./routes/students'));

app.use(express.static(`../${folderName}/build`));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..') + `/${folderName}/build/index.html`);
});

app.use(errorLogger);   // enabling the error logger
app.use(errors());      // celebrate error handler

app.listen(PORT, function () {
    console.log(`App is running on port ${PORT}`);
});
