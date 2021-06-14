const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.UUID = require('uuid');

require('./Middleware/dbConnection');

app.use(bodyParser.json());

app.use('/user', require('./Routes/user'));
app.use('/account', require('./Routes/transaction'));

app.listen(8080, () => {
    console.log('listening on port 8080');
});
