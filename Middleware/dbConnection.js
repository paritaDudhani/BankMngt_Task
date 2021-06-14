const db = require('mongoose');
require('dotenv').config();

const options = {
    useNewUrlParser: true
};

(() => {
    db.connect(process.env.DB_URL, options)
        .then(() => {
            console.log('Connection established');
        }).catch(err => {
            console.log('Fialed to connect: ', err.message);
        });
})();
