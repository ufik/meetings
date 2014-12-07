'use strict';

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
	    name: DataTypes.STRING
	}, {
	    classMethods: {
	      associate: function(models) {
	        User.hasMany(models.Meeting, {through: models.UserMeeting});
	        User.hasMany(models.Suggestion);
	      }
	    }
	  });

	return User;
}