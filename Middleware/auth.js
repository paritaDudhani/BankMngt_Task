const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    authenticateUser (req, res, next) {
        try {
            const userDetails = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            if (!userDetails) {
                res.status(401).send({ message: 'User not authorized' });
            } else {
                next();
            }
        } catch (err) {
            res.status(400).send({ message: err.message });
        }
    }
}
