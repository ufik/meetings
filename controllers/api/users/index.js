'use strict';

var models = require('../../../models');

module.exports = function (router) {

    router.get('/', function (req, res) {
    	models.User.findAll().then(function (users) {
    		res.json(users);
    	});
    });

    router.get('/:id', function (req, res) {
    	var id = req.params.id;

    	models.User.find(id).then(function (user) {
    		res.json(user);
    	});
    });

    router.post('/', function (req, res) {
    	var name = req.body.name;

    	models.User.create({
    		name: name,
    	}).success(function (user) {
    		res.json(user);
    	});
    });

    router.put('/:id', function (req, res) {
    	var id = req.params.id;
    	var name = req.body.name;

    	models.User.find(id).success(function (user) {
    		user.updateAttributes({
    			name: name
    		}).success(function () {
    			res.json('');
    		});
    	});
    });

    router.delete('/:id', function (req, res) {
    	var id = req.params.id;

    	models.User.find(id).success(function (user) {
    		if (user) {
	    		user.destroy().success(function (){
	    			res.json(true);
	    		});
	    	} else {
	    		res.json(false);
	    	}
    	});
    });
}