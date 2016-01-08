var mongoose = require('mongoose');

module.exports = mongoose.model('Meetup', {
    name: String,
    job: String,
    vote: {type: Number, default: 0 },
    voteup:{ type: Boolean, default: true},
    votedown:{ type: Boolean, default: true}
});

