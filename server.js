var express              = require('express'),
    app                  = express(),
    meetupsController    = require('./server/router/meetups-controller'),
    testupsupsController = require('./server/router/testups-controller'),
    mongoose             = require('mongoose');
    bodyParser           = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mean-demo');
app.use(bodyParser());
app.get('/', function(req, res){
    res.sendfile(__dirname + '/client/views/index.html');
});

app.use('/static', express.static(__dirname+ '/client')); 
//app.use('/static', express.static(__dirname+ '/client'));

// Rest API
app.get('/api/testups', testupsupsController.listTestups);
app.post('/api/testups', testupsupsController.createTestup);
app.delete('/api/testups/:id', testupsupsController.deleteTestup);
app.put('/api/testups/:id', testupsupsController.updateTestup);

app.get('/api/meetups', meetupsController.listMeetups);
app.post('/api/meetups', meetupsController.createMeetup);
app.delete('/api/meetups/:id', meetupsController.deleteMeetup);
app.put('/api/meetups/:id', meetupsController.updateMeetup);
app.put('/api/meetups/:vote/:id', meetupsController.updateMeetupVote);



app.listen(3000, function(){
    console.log('I am listning 3000');
});
