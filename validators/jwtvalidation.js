const jwt = require('jsonwebtoken');
const CreateError = require('http-errors');
require('dotenv').config();

module.exports = {
    // Verify token
    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization']) return next(CreateError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        console.log(bearerToken);
        const token = bearerToken[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if(err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(CreateError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    },

    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userID,
            };
            const secret = process.env.TOKEN_SECRET;
            const options = {
                expiresIn: '1h',
                issuer: 'localhost:3000',
                audience: `${userID}`,
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(CreateError.InternalServerError());
                }
                resolve(token);
            });
        });
    }
};