angular.module('meetingApp').controller('MeetingDetailCtrl', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
    $scope.meetingId = $routeParams.meetingId;
    
    var Meeting = $resource('/api/meetings/:meetingId', {meetingId:'@id'}, {
    	update: {method: 'PUT'}
    });
    var Suggestion = $resource('/api/meetings/:meetingId/suggestion/:suggestionId', {meetingId:'@id'});
    var Attendee = $resource('/api/meetings/:meetingId/attendee/:userId', {meetingId:'@id', userId: '@userId'}, {
        update: {method: 'PUT'}
    });
    var User = $resource('/api/users/:id');

    $scope.tinymceOptions = {
        inline: true
    };

    User.query(function(users) {
        $scope.users = users;
    });

    $scope.usersFiltered = function() {
        var filtered = [];
        angular.forEach($scope.users, function(user) {
            var add = true;
            angular.forEach($scope.attendees, function(attendee){
                if (attendee.id == user.id) {
                    add = false;
                }
            });

            if (add) {
                filtered.push(user);
            }
        });

        return filtered;
    };

    $scope.addAttendee = function() {
        Attendee.update({
            id: $scope.meetingId,
            userId: $scope.attendee
        }, function() {
            $scope.reload();
        });
    };

    $scope.save = function() {
    	Meeting.update({
    		id: $scope.meetingId,
    		purpose: $scope.meeting.purpose,
    		content: $scope.meeting.content
    	},
    	function() {
    		console.log('updated');
    	});
    };

    $scope.reload = function() {
    	Meeting.get({ meetingId: $scope.meetingId}, function(data) {
	    	$scope.meeting = data.meeting;
	    	$scope.attendees = data.users;
	    	$scope.suggestions = data.suggestions;
	    });
    };

    $scope.reload();

    $scope.saveSuggestion = function() {
    	console.log($scope.user);
    	Suggestion.save({id: $scope.meetingId, user: $scope.user, suggestion: $scope.suggestion}, function() {
    		$scope.reload();
    		$scope.suggestion = '';
    	});
    };
  }]);