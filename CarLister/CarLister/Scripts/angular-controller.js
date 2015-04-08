angular.module('carFinderApp').controller('carFinderController', ['$scope', '$http', 'carSvc', function ($scope, $http, carSvc) {
    $scope.selectedYear = '';
    $scope.selectedMake = '';
    $scope.selectedModel = '';
    $scope.selectedTrim = '';

    $scope.years = [];
    $scope.makes = [];
    $scope.models = [];
    $scope.trims = [];
    $scope.allCars = [];

    $scope.getYears = function () {
        carSvc.getYears().then(function (data) {
            $scope.years = data;
        });
    };

    $scope.getMakes = function () {
        carSvc.getMakes($scope.selectedYear).then(function (data) {
            $scope.makes = data;
            $scope.getCars();
            setHeight($('#div1'), $('#div2'));
        });
    };

    $scope.getModels = function () {
        carSvc.getModels($scope.selectedYear, $scope.selectedMake).then(function (data) {
            $scope.models = data;
            $scope.getCars();
        });
    };

    $scope.getTrims = function () {
        carSvc.getTrims($scope.selectedYear, $scope.selectedMake, $scope.selectedModel).then(function (data) {
            $scope.trims = data;
            $scope.getCars();
        });
    };

    $scope.getCars = function () {
        carSvc.getCars($scope.selectedYear, $scope.selectedMake, $scope.selectedModel, $scope.selectedTrim).then(function (data) {
            $scope.allCars = data;
        });
    };

    $scope.getYears();

    /*scope.getYears = function () {
        carSvc.getYears().then(function (data) {
            scope.years = data;
        });
    };*/
}]);