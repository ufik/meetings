'use strict';

var models = require('../../../models');

module.exports = function (router) {

    router.get('/', function (req, res) {
    	models.Meeting.findAll({include: [ models.User ]}).then(function (meetings) {
    		res.json(meetings);
    	});
    });

    router.get('/:id', function (req, res) {
    	var id = req.params.id;

    	models.Meeting.find(id).success(function (meeting) {
    		if (meeting) {
	    		meeting.getUsers().success(function (users) {
	    			meeting.getSuggestions().success(function (suggestions) {
	    				res.json({
		    				meeting: meeting,
		    				users: users,
		    				suggestions: suggestions
		    			});	
	    			});
	    		});
	    	} else {
	    		res.json(false);
	    	}
    	});
    });

    router.post('/', function (req, res) {
    	var topic = req.body.topic;
    	var content = req.body.content;
    	var purpose = req.body.purpose;
        var date = req.body.date;

    	models.Meeting.create({
    		topic: topic,
    		content: content,
    		purpose: purpose,
    		date: date
    	}).success(function (meeting) {
    		res.json(meeting);
    	});
    });

    router.put('/:id', function (req, res) {
    	var id = req.params.id;
    	var topic = req.body.topic;
    	var content = req.body.content;
    	var purpose = req.body.purpose;

    	models.Meeting.find(id).success(function (meeting) {
    		meeting.updateAttributes({
    			topic: topic,
    			content: content,
    			purpose: purpose
    		}).success(function () {
    			res.json('');
    		});
    	});
    });

    router.delete('/:id/attendee/:idUser', function (req, res) {
    	var id = req.params.id;
    	var idUser = req.params.idUser;

    	models.UserMeeting.find({where: {MeetingId:id, UserId: idUser}}).success(function (userMeeting) {
    		if (userMeeting) {
    			userMeeting.destroy().success(function() {
    				res.json(true);
    			});
    		} else {
    			res.json(false);
    		}
    	});
    });

    router.post('/:id/suggestion', function (req, res) {
    	var id = req.params.id;
    	var idUser = req.body.user;
    	var content = req.body.suggestion;

    	models.Meeting.find(id).success(function (meeting) {
    		models.User.find(idUser).success(function (user) {
    			if (meeting && user && content.length > 0) {
	    			models.Suggestion.create({
	    				content: content,
	    				MeetingId: id,
	    				UserId: idUser
	    			}).success(function(suggestion) {
	    				res.json(suggestion);
	    			});
	    		} else {
	    			res.json(false);
	    		}
    		});
    	});
    });

    /**
     * TODO move to /api/suggestions/
     * 
     */
    router.delete('/:id/suggestion/:idSuggestion', function (req, res) {
    	var id = req.params.id;
    	var idSuggestion = req.params.idSuggestion;

    	models.Suggestion.find(idSuggestion).success(function (suggestion) {
    		if (suggestion) {
    			suggestion.destroy().success(function() {
    				res.json(true);
    			});
    		} else {
    			res.json(false);
    		}
    	});
    });

    /**
     * TODO move to /api/suggestions/
     * 
     */
    router.put('/:id/suggestion/:idSuggestion', function (req, res) {
    	var id = req.params.id;
    	var idSuggestion = req.params.idSuggestion;
    	var content = req.body.suggestion;
    	var userId = req.body.user;

    	models.Suggestion.find(idSuggestion).success(function (suggestion) {
    		models.User.find(userId).success(function (user) {
    			if (suggestion && user) {
	    			suggestion.updateAttributes({
		    			content: suggestion.length > 0 ? content : suggestion.content,
		    			UserId: userId
		    		}).success(function () {
		    			res.json(true);
		    		});
		    	} else {
		    		res.json(false);
		    	}
    		});
    	});
    });

    /**
     * 
     * 
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * 
     * @return {[type]}     [description]
     */
    router.put('/:id/attendee/:idUser', function (req, res) {
    	var id = req.params.id;
    	var idUser = req.params.idUser;
    	var leader = req.body.leader ? true : false;

    	models.Meeting.find(id).success(function (meeting) {
    		models.User.find(idUser).success(function (user) {
    			if (meeting && user) {
	    			meeting.addUser(user, {leader: leader});
	    			meeting.save().success(function() {
	    				res.json(user);
	    			});
	    		} else {
	    			res.json(false);
	    		}
    		});
    	});
    });

    router.delete('/:id', function (req, res) {
    	var id = req.params.id;

    	models.Meeting.find(id).success(function (meeting) {
    		if (meeting) {
	    		meeting.destroy().success(function (){
	    			res.json(true);
	    		});
	    	} else {
	    		res.json(false);
	    	}
    	});
    });
}