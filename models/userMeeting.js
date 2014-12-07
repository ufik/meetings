'use strict';

module.exports = function(sequelize, DataTypes) {
	var UserMeeting = sequelize.define('UserMeeting', {
	    leader: DataTypes.BOOLEAN
	}, {
	    classMethods: {
	      associate: function(models) {
	        
	      }
	    }
	  });

	return UserMeeting;
}