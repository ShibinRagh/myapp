var Testup = require('../models/testup');

module.exports.createTestup = function(req, res){
    var testup = new Testup(req.body);
    testup.save(function(err, result){
        res.json(result);
    });
};
module.exports.listTestups = function(req, res){
    Testup.find(function(err, results){
        res.json(results);
    });
};
module.exports.deleteTestup = function(req, res){
    Testup.findByIdAndRemove(req.params.id, function(err, results){
       if(err)
           res.send(err)
        res.json(results);
    });
};
module.exports.updateTestup = function(req, res){
    Testup.findByIdAndUpdate(req.params.id, { $set: {'name': req.body.name, 'job': req.body.job } } , function(err, result){
        if(err)
            res.send(err)
        res.json(result);
    });
};

 

 