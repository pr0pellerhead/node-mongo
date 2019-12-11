const express = require('express');
const config = require('../config/index.js');
const files = require('../handlers/files');
const fileupload = require('express-fileupload');
const jwt = require('express-jwt');

var api = express();

api.use(
    jwt(
        {secret: config.getConfig('jwt').key}
    )
);

api.use(fileupload({
    limits: {fileSize: 50 * 1024 * 1024},
}));

api.post('/api/v1/upload', files.UploadFile);

api.listen(8002, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server successfully started on port 8001');
});