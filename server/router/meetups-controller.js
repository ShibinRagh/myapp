var Meetup = require('../models/meetup');

module.exports.createMeetup = function(req, res){
    var meetup = new Meetup(req.body);
    meetup.save(function(err, result){
        res.json(result);
    });
};
module.exports.listMeetups = function(req, res){
    Meetup.find(function(err, results){
        res.json(results);
    });
};

module.exports.deleteMeetup = function(req, res){
  Meetup.findByIdAndRemove(req.params.id, function(err, results) {
    if (err)
      res.send(err);
    res.json(results);
  });
};
module.exports.updateMeetup = function(req, res){
  Meetup.findByIdAndUpdate(req.params.id, { $set: {'name': req.body.name, 'job': req.body.job} }, function(err, results) {
    if (err)
      res.send(err + 'error');
    res.json(results);
  });
};
module.exports.updateMeetupVote = function(req, res){
    console.log(req.body.vote);
  Meetup.findByIdAndUpdate(req.params.id, { $set: {'vote': req.body.vote, 'voteup': req.body.voteup, 'votedown': req.body.votedown} }, function(err, results) {
    if (err)
      res.send(err + 'error');
    res.json(results);
    console.log('hi');
  });
};
