const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://dev:DEV123!@cluster0-c3iyx.mongodb.net/school?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const Student = mongoose.model(
    'student',
    new mongoose.Schema({
        first_name: String,
        last_name: String,
        average_grade: Number,
        courses: [String],
        email: String,
        birthday: Date
    })
);

var s = new Student({
    first_name: "Pero",
    last_name: "Perovski",
    average_grade: 9.85,
    courses: ["kibernetika", "cyber", "kriminalistika"],
    email: "pero@perovski.mk",
    birthday: new Date("1998-10-29T07:45:00Z")
});

s.save(err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('successfull save');
});