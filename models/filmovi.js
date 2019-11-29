const mongoose = require('mongoose');

const Film = mongoose.model(
    'film', 
    new mongoose.Schema({
        ime: String,
        godina: Date,
        zanr: [String],
        rezija: String,
        oscar: Boolean,
        akteri: [String],
        user_id: String
    }, 
    {
        collection: 'filmovi'
    })
);

const getAll = (userID) => {
    return new Promise((success, fail) => {
        Film.find({user_id: userID}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data);
        });
    });
};

const getOne = (id, userID) => {
    return new Promise((success, fail) => {
        Film.find({_id: id, user_id: userID}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data[0]);
        });
    });
};

const save = (data) => {
    return new Promise((success, fail) => {
        var f = new Film(data);
        f.save(data, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const remove = (id) => {
    return new Promise((success, fail) => {
        Film.deleteOne({_id: id}, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
}

const replace = (id, data) => {
    return new Promise((success, fail) => {
        Film.updateOne({_id: id}, data, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
}

module.exports = {
    getAll,
    getOne,
    save,
    remove,
    replace
};