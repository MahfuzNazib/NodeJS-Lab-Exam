var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('/', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
		//res.render('home/index', {user: result});
		res.render('scoutHome/index', {user : result});
	});
});

module.exports = router;