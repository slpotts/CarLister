﻿var app = angular.module("dribbbleScorer", []);

app.controller("DribbbleController", function ($scope, DribbblePlayer) {
    $scope.newPlayer = null;
    $scope.players = [];

    $scope.addPlayer = function (player) {
        $scope.players.push(new DribbblePlayer(player));
    };

    $scope.removePlayer = function (player) {
        $scope.players.splice($scope.players.indexOf(player), 1);
    };
});

// We need to inject the $http service in to our factory
app.factory("DribbblePlayer", function ($http) {
    // Define the DribbblePlayer function
    var DribbblePlayer = function (player) {
        // Define the initialize function
        this.initialize = function () {
            // Fetch the player from Dribbble
            var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';
            var playerData = $http.jsonp(url);
            var self = this;

            // When our $http promise resolves
            // Use angular.extend to extend 'this'
            // with the properties of the response
            playerData.then(function (response) {
                angular.extend(self, response.data);
            });
        };

        this.likeScore = function () {
            return this.likes_received_count - this.likes_count;
        };

        this.commentScore = function () {
            return this.comments_received_count - this.comments_count;
        };

        // Call the initialize function for every new instance
        this.initialize();
    };

    // Return a reference to the function
    return (DribbblePlayer);
});