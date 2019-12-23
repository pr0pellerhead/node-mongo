const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
const config = require('../config/index.js');
const db = require('../db/connection');
const auth = require('../handlers/auth');
const path = require('path');

db.init(config.getConfig('db'));


var api = express();
// //////////////////////////
// only for testing purposes
// //////////////////////////
var pub = path.join(__dirname, '..', 'public');
api.use('/public', express.static(pub));
// //////////////////////////
// only for testing purposes
// //////////////////////////
api.use(bodyParser.json());
api.use(
    jwt(
        {secret: config.getConfig('jwt').key}
    )
    .unless(
    {path: ['/api/v1/register', '/api/v1/login', '/public', /\/api\/v1\/confirm\/.*/]}
    )
);

api.post('/api/v1/register', auth.register);
api.get('/api/v1/confirm/:confirm_hash', auth.confirm);
api.post('/api/v1/login', auth.login);
api.get('/api/v1/renew', auth.renew);
api.post('/api/v1/reset-link', auth.resetLink);
api.post('/api/v1/reset-password', auth.resetPassword);
api.post('/api/v1/change-password', auth.changePassword);

api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({message: 'Invalid token'});
    } else {
        next(err);
    }
});

api.listen(8001, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server successfully started on port 8001');
});
