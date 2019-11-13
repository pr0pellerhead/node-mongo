const mFilmovi = require('../models/filmovi');

const getAll = (req, res) => {
    mFilmovi.getAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

const getOne = (req, res) => {
    mFilmovi.getOne(req.params.id)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

const save = (req, res) => {
    var data = req.body;
    let er = 0;
    if(data.ime == undefined || data.ime.length == 0){er++;}
    if(data.rezija == undefined || data.rezija.length == 0){er++;}
    if(data.godina == undefined || data.godina.length == 0){er++;}
    if(data.zanr == undefined || data.zanr.length == 0){er++;}
    if(data.akteri == undefined || data.akteri.length == 0){er++;}
    if(data.oscar == undefined){er++;}

    if(er == 0){
        mFilmovi.save(data)
        .then(() => {
            res.status(201).send('Created');
        })
        .catch(err => {
            res.status(500).send(err);
        });
    } else {
        res.status(400).send('Bad request');
    }
}

const replace = (req, res) => {
    res.send('OK');
}

const update = (req, res) => {
    res.send('OK');
}

const remove = (req, res) => {
    res.send('OK');
}

module.exports = {
    getAll,
    getOne,
    save,
    replace,
    update,
    remove
}