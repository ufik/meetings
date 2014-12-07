'use strict';

module.exports = function (sequelize, DataTypes) {
	var Meeting = sequelize.define('Meeting', {
	    topic: DataTypes.STRING,
	    date: DataTypes.DATE,
	    purpose: DataTypes.TEXT,
	    content: DataTypes.TEXT
	}, {
	    classMethods: {
	      associate: function(models) {
	        Meeting.hasMany(models.User, {through: models.UserMeeting});
	        Meeting.hasMany(models.Suggestion);
	      }
	    }
	  });

	return Meeting;
}