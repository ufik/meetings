'use strict';

module.exports = function(sequelize, DataTypes) {
	var Suggestion = sequelize.define('Suggestion', {
	    content: DataTypes.TEXT
	}, {
	    classMethods: {
	      associate: function(models) {
	      }
	    }
	  });

	return Suggestion;
}