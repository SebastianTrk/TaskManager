//this file will handle connection logic to mongodb database


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/task-manager', {useUnifiedTopology: true} ).then(() => {
    console.log("Connected to mongodb succesfully :)");
}).catch((e) =>{
    console.log("Error while attempting to connect to mongodb");
    console.log(e);
});





module.exports = {
    mongoose
};
