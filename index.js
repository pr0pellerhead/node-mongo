const express = require('express');
const bodyParser = require('body-parser');

const DBConn = require('./db/connection');
const filmovi = require('./handlers/filmovi');

DBConn.init();
const api = express();
api.use(bodyParser.json());

api.get('/api/v1/filmovi', filmovi.getAll);
api.get('/api/v1/filmovi/:id', filmovi.getOne);
api.post('/api/v1/filmovi', filmovi.save);
api.put('/api/v1/filmovi/:id', filmovi.replace);
api.patch('/api/v1/filmovi/:id', filmovi.update);
api.delete('/api/v1/filmovi/:id', filmovi.remove);

api.listen(8000, err => {
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port 8000');
});
