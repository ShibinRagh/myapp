var mongoose = require('mongoose');

module.exports = mongoose.model('Testup', {
    name: String,
    job: String
});