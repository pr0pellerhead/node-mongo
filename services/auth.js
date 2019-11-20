const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/index.js');
const db = require('../db/connection');
const auth = require('../handlers/auth');

db.init(config.getConfig('db'));

var api = express();
api.use(bodyParser.json());

api.post('/api/v1/register', auth.register);
api.post('/api/v1/login', auth.login);
api.get('/api/v1/renew', auth.renew);
api.post('/api/v1/reset-link', auth.resetLink);
api.post('/api/v1/reset-password', auth.resetPassword);
api.post('/api/v1/change-password', auth.changePassword);

api.listen(8001, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server started on port 8081');
});
