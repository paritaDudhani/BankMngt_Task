const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../Models/user.model');
const AccountModel = require('../Models/account.model');

module.exports = {
    validateAccount (req, res, next) {
        try {
            AccountModel.find({
                accountNo: {
                    $in: [req.body.toAccountNo, req.body.fromAccountNo]
                }
            }).then(accountDetails => {
                if (!accountDetails) {
                    res.status(400).send({ message: 'Transaction not valid' });
                } else if(accountDetails[0].userId === accountDetails[1].userId){
                    res.status(400).send({ message: 'Same user transaction not allowed' });
                } else {
                    next();
                }
            })
            
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    }, 
    validateBalance (req, res, next) {
        try {
            AccountModel.findOne({
                accountNo: req.body.fromAccountNo
            }).then(accountDetails => {
                if (!accountDetails) {
                    res.status(400).send({ message: 'Transaction not valid' });
                } else if(accountDetails.balance < req.body.amount){
                    res.status(400).send({ message: 'Insufficient amount' });
                } else {
                    AccountModel.findOne({
                        accountNo: req.body.toAccountNo
                    }).then(data => { 
                        if (!data) {
                            res.status(400).send({ message: 'Transaction not valid' });
                        } else if (data.accountType === 'basic' &&
                            (data.balance + req.body.amount)>50000) {
                            res.status(400).send({ message: 'Basic account balance exceed' });
                        } else {
                            next();
                        }
                    }).catch(err => res.status(400).send({ message: err.message}))
                }
            })
            
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    }
}
