var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('/', function(req, res){
    res.render('register/index');
});

router.post('/', function(req, res){
    var user = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        type : req.body.type,
        username : req.body.username,
        password : req.body.password
    }

    userModel.insert(user, function(status){
        if(status){
            res.redirect('/login');
        }
        else{
            res.send('Not Registered !');
        }
    });
});

module.exports = router;