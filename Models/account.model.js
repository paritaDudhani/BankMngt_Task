const db = require('mongoose');

const schema = new db.Schema({
    _id: {
        type: String,
        default: UUID.v4
    },
    accountType: { 
        type: String, 
        enum: ['saving', 'basic', 'current'],
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    accountNo: {
        type: String,
        unique: true,
        required: true
    },
    userId: { 
        type: String,
        required: true,
        ref: 'user'
    }
})

module.exports = db.model('account', schema);
