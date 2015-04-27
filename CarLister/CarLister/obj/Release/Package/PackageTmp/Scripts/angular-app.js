angular.module('carFinderApp', ['ui.bootstrap', 'ui.grid', 'ui.grid.pagination', 'ui.grid.autoResize']);

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
            var options = { params: { year: year, make: make } };

            return $http.get('/api/cars/getModels', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.getTrims = function (year, make, model) {
            var options = { params: { year: year, make: make, model: model } };

            return $http.get('/api/cars/getTrims', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.getCars = function (year, make, model, trim) {
            var options = { params: { year: year, make: make, model: model, trim: trim } };

            return $http.get('/api/cars/getCars', options)
                .then(function (response) {
                    return response.data;
                })
        };

        factory.recall = function (year, make, model) {
            var options = { params: { year: year, make: make, model: model } };

            return $http.get('/api/cars/getRecalls', options).then(function (response) {
                return JSON.parse(response.data);
            })
        };

        factory.getCar = function (Id) {
            var options = { params: { Id: Id } };


            return $http.get('/api/cars/getCar', options).then(function (response) {
                response.data.Recalls = JSON.parse(response.data.Recalls)
                return response.data;
            })
        };
        return factory;
    }]);

        angular.module('carFinderApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, car) {

            $scope.car = car;

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.current = 0;
            $scope.a = car.Recalls.Results;

            $scope.prev = function () {
                if ($scope.current > 0 && $scope.a.length > 1)
                {
                    $scope.current = $scope.current - 1;
                }
            }

            $scope.next = function () {
                if ($scope.current < ($scope.a.length - 1))
                {
                    $scope.current = $scope.current + 1;
                }
            }
        });