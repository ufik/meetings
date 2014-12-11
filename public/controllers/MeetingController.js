angular.module('meetingApp').controller('MeetingCtrl', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
    $scope.meetingId = $routeParams.meetingId;

    var Meeting = $resource('/api/meetings/:meetingId', {meetingId:'@id'});
    var User = $resource('/api/users/:id');

    $scope.dateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };

    $scope.reload = function() {
    	Meeting.query(function (data) {
	    	$scope.meetings = data;
	    });
    };

    $scope.reload();
    
    $scope.getLeader = function(meeting) {
    	var rUser = {};
    	angular.forEach(meeting.Users, function (user) {
    		if (user.UserMeeting.leader) {
    			rUser = user;
    		}
    	});

    	return rUser;
    };

    $scope.delete = function(id) {
    	if (confirm('Are you sure?')) {
	    	Meeting.delete({ meetingId: id}, function() {
	    		$scope.reload();
	    	});
	    }
    };

    $scope.save = function() {
    	Meeting.save('', {topic: $scope.topic, date: $scope.date + ' ' + $scope.time}, function (){
	    	$scope.reload();
	    });
    };

  }]);