angular.module('carFinderApp', []);

angular.module('carFinderApp')
    .factory('carSvc', ['$http', function($http) {
        var factory = {};

        factory.getYears = function () {
            return $http.get('/api/cars/getYears')
            .then(function (response) { return response.data; })
        };

        factory.getMakes = function (year) {
            var options = { params: { year: year } };

            return $http.get('/api/cars/getMakes', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.getModels = function (year, make) {
            var options = { params: { year: year, makes: make } };

            return $http.get('/api/cars/getModels', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.getTrims = function (year, make, model) {
            var options = { params: { year: year, makes: make, modelName: model } };

            return $http.get('/api/cars/getTrims', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.getCars = function (year, make, model, trim) {
            var options = { params: { year: year, makes: make, modelName: model, modelTrim: trim } };

            return $http.get('/api/cars/getCars', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.recall = function (year, make, model) {
            var url = '/api/Recalls/vehicle/modelyear/' + year + '/make/' + make + '/model/' + model + '?format=json';
            var recallData = $http.jsonp(url);
            var self = this;
        }
        return factory;
    }]);