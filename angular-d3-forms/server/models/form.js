// grab the packages we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formSchema = new Schema({
    user:String,
    formData:String // Store the toString data 
});

// the schema is useless so far
// we need to create a model using it
var FormData = mongoose.model('FormData', formSchema);
// make this available to our users in our Node applications
module.exports = FormData;
