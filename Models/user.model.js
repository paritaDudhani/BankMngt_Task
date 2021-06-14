const db = require('mongoose');

const schema = new db.Schema({
    _id: {
        type: String,
        default: UUID.v4
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = db.model('user', schema);
