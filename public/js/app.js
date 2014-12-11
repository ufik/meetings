'use strict';

var meetingApp = angular.module('meetingApp', [
	'ngRoute',
	'ngResource',
	'textAngular'
]);

angular.module('meetingApp').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/meetings', {
        templateUrl: 'templates/meetings.html',
        controller: 'MeetingCtrl'
      }).
      when('/meetings/:meetingId', {
        templateUrl: 'templates/meeting-detail.html',
        controller: 'MeetingDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);