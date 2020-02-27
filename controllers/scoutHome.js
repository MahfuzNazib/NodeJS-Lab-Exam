var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('/', function(req, res){
    userModel.getByUname(req.cookies['username'], function(result){
		//res.render('home/index', {user: result});
		res.render('scoutHome/index', {user : result});
	});
});

router.get('/post', function(req, res){
	res.render('scoutHome/post');
});

router.post('/post', function(req, res){
	var data = {
		placename : req.body.placename,
		costing : req.body.costing,
		medium : req.body.medium,
		description : req.body.description,
		status : 'pending'
	};

	userModel.insertPost(data, function(status){
		if(status){
			res.send('Your Post is in Pending.');
		}
		else{
			res.send('Post is Not submitted!!Try again');
		}
	});
});


router.get('/profile', function(req, res){
	//res.render('scoutHome/profile');
	userModel.getByUname(req.cookies['username'], function(result){
		//res.render('home/index', {user: result});
		res.render('scoutHome/profile', {user : result});
	});
});

router.post('/profile', function(req, res){
	var user = {
		name : req.body.name,
		email : req.body.email,
		phone : req.body.phone,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/scoutHome');
		}
		else{
			res.send('Updating is not complete!!');
		}
	});
});



module.exports = router;