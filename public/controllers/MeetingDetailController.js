angular.module('meetingApp').controller('MeetingDetailCtrl', ['$scope', '$routeParams', '$resource',
  function($scope, $routeParams, $resource) {
    $scope.meetingId = $routeParams.meetingId;
    
    var Meeting = $resource('/api/meetings/:meetingId', {meetingId:'@id'}, {
    	update: {method: 'PUT'}
    });
    var Suggestion = $resource('/api/meetings/:meetingId/suggestion/:suggestionId', {meetingId:'@id'});
    var Attendee = $resource('/api/meetings/:meetingId/attendee/:userId/:leader', {meetingId:'@id', userId: '@userId'}, {
        update: {method: 'PUT'}
    });
    var User = $resource('/api/users/:id');

    $scope.showUserForm = false;

    $scope.tinymceOptions = {
        inline: true
    };

    User.query(function(users) {
        $scope.users = users;
    });

    $scope.toggleUserForm = function() {
        $scope.showUserForm = !$scope.showUserForm;
    };

    $scope.saveUser = function() {
        User.save({
            name: $scope.username
        }, function() {
            $scope.username = '';
            $scope.reload();
        });
    };

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

    $scope.setPresenter = function(id, leader) {
        Attendee.update({
            id: $scope.meetingId,
            userId: id,
            leader: !leader
        }, function() {
            $scope.reload();
        });
    };

    $scope.removeAttendee = function(id) {
        Attendee.remove({
            meetingId: $scope.meetingId,
            userId: id
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

    $scope.removeSuggestion = function(id) {
        Suggestion.remove({
            meetingId: $scope.meetingId,
            suggestionId: id
        }, function() {
            $scope.reload();
            console.log('Suggestion removed.');
        });
    };

    $scope.reload = function() {
    	Meeting.get({ meetingId: $scope.meetingId}, function(data) {
	    	$scope.meeting = data.meeting;
	    	$scope.attendees = data.users;
	    	$scope.suggestions = data.suggestions;
	    });

        User.query(function(users) {
            $scope.users = users;
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