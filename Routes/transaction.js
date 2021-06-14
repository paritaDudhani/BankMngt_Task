const express = require('express');
const route = express();
const Transaction = require('mongoose-transactions');
const transaction = new Transaction();
require('dotenv').config();

const UserModel = require('../Models/user.model');
const AccountModel = require('../Models/account.model');
const AuthMiddleware = require('../Middleware/auth');
const ValidateTransactionMiddleware = require('../Middleware/validateTransaction');

route.post('/', (req, res) => {
    AccountModel.create({ ...req.body })
        .then(data => { res.status(200).json(data) })
        .catch(err => {
            res.status(400).json('Failed to insert')
        });
});

route.post('/transfer', AuthMiddleware.authenticateUser,
    ValidateTransactionMiddleware.validateAccount,
    ValidateTransactionMiddleware.validateBalance,  
    (req, res) => {
        AccountModel.find({
            accountNo: {
                $in: [req.body.toAccountNo, req.body.fromAccountNo]
            }
        }).then(async (accountDetails) => { 
            if (!accountDetails) {
                return res.status(400).send({ message: 'Transaction not valid' });
            }
            try {
                accountDetails[0].balance += req.body.amount;
            accountDetails[1].balance -= req.body.amount;
                // Test false transaction
                // accountDetails[1]._id = '1235';
                transaction.update('account', accountDetails[0]._id, accountDetails[0]);
                transaction.update('account', accountDetails[1]._id, accountDetails[1]);
                await transaction.run();
                res.status(200).json('OK');

            } catch (err) {
                await transaction.rollback().catch(console.log('rol backerr: ',err));
                transaction.clean();
                res.status(500).send({ message: 'Something went wrong' });
            }
        }).catch();
})

module.exports = route;
