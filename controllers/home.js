var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('adminHome/index', {user : result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('adminHome/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});

});

//All Posts

router.get('/all_posts', function(req, res){
	userModel.getAllPost(function(results){
		if(results.length > 0){
			res.render('adminHome/all_posts', {userlist: results});
		}else{
			res.redirect('/home');
		}
	});
});

router.post('/view_users', function(req, res){
	var id = req.body.id;
	userModel.getByID(id, function(results){
		if(results.length > 0){
			res.render('adminHome/view_users', {userlist : results});
		}
		else{
			res.send('No Recoed Found !!');
		}
	});
});

router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('adminHome/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			name : req.body.name,
			email : req.body.email,
			phone : req.body.phone,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

//Edit Post
router.get('/editPost/:id', function(req, res){
	userModel.postById(req.params.id, function(result){
		res.render('adminHome/editPost', {user: result});
	});
});


router.get('/delete/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('adminHome/delete', {user: result});
	});
});

router.post('/delete/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/delete/'+req.params.id);
			}
		});
});



router.get('/addUser', function(req, res){
	res.render('home/addUser');
});

router.post('/addUser', function(req, res){
	
		// req.check('username', 'Invalid Username').isLength({min:4});
		// req.check('password', 'Invalid password').isLength({min:4});

		// var errors = req.validationErrors();
		// if(errors){
		// 	res.send('Error');
		// }
		// else{
		var user = {
			//id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};
	//}

		userModel.insert(user, function(status){
			if(status){
				console.log('Registered');
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/addUser/');
			}
		});
});

module.exports = router;