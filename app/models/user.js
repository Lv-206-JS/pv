var mongoose    = require('mongoose');
/*mongoose.connect('mongodb://localhost/RestApi');*/

var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
        firstname: String,
        lastname:  String,
        email:     String,
        password:  String
}));

