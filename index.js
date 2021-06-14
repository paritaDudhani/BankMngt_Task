const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.UUID = require('uuid');

// Database connection middleware
require('./Middleware/dbConnection');

app.use(bodyParser.json());

// Routes
app.use('/user', require('./Routes/user'));
app.use('/account', require('./Routes/transaction'));

app.listen(8080, () => {
    console.log('listening on port 8080');
});
