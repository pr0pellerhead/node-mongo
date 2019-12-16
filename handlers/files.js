const randomstring = require('randomstring');
const fs = require('fs');
const path = require('path');

const UploadFile = (req, res) => {
    var file = req.files.file;

    if(file.size > 10 * 1024 * 1024){
        return res.status(500).send('Filesize too big');
    }

    var allowedTypes = [
        'image/png', 
        'image/jpg', 
        'image/jpeg', 
        'image/pjpeg', 
        'image/gif'
    ];

    if(allowedTypes.indexOf(file.mimetype) == -1){
        return res.status(500).send('Filetype not on the list');
    }

    var prefix = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });

    let name = file.name.replace(/ /g, '_');
    let path = `./uploads/${req.user.id}`;
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    file.mv(`${path}/${prefix}_${name}`, err => {
        if(err){
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).send({
            filename: `${prefix}_${name}`
        });
    });
}

const DownloadFile = (req, res) => {
    
    let filepath = path.resolve(`${__dirname}/../uploads/${req.user.id}/${req.params.filename}`);
    if(fs.existsSync(filepath)){
        res.sendFile(filepath);
    } else {
        res.status(404).send('Not found');
    }
}

module.exports = {
    UploadFile,
    DownloadFile
}