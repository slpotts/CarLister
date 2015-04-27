angular.module('carFinderApp').controller('carFinderController', ['$scope', '$http', '$modal', 'uiGridConstants', 'carSvc', function ($scope, $http, $modal, uiGridConstants, carSvc) {
    $scope.selectedYear = '';
    $scope.selectedMake = '';
    $scope.selectedModel = '';
    $scope.selectedTrim = '';

    $scope.years = [];
    $scope.makes = [];
    $scope.models = [];
    $scope.trims = [];
    $scope.allCars = [];
    $scope.recallData;
    $scope.allData;

    $scope.getYears = function () {
        carSvc.getYears().then(function (data) {
            $scope.years = data;
            $scope.make = [];
            $scope.models = [];
            $scope.trims = [];
            $scope.selectedMake = '';
            $scope.selectedModel = '';
            $scope.selectedTrim = '';
        });
    };

    $scope.getMakes = function () {
        carSvc.getMakes($scope.selectedYear).then(function (data) {
            $scope.makes = [];
            $scope.selectedMake = '';
            $scope.makes = data;
            $scope.models = [];
            $scope.trims = [];
            $scope.selectedModel = '';
            $scope.selectedTrim = '';
            $scope.getCars();
        });
    };

    $scope.getModels = function () {
        carSvc.getModels($scope.selectedYear, $scope.selectedMake).then(function (data) {
            $scope.models = [];
            $scope.selectedModel = '';
            $scope.models = data;            
            $scope.trims = [];
            $scope.selectedTrim = '';
            $scope.getCars();
        });
    };

    $scope.getTrims = function () {
        carSvc.getTrims($scope.selectedYear, $scope.selectedMake, $scope.selectedModel).then(function (data) {
            $scope.trims = [];
            $scope.selectedTrim = '';
            $scope.trims = data;
            $scope.getCars();
        });
    };

    $scope.getCars = function () {
        carSvc.getCars($scope.selectedYear, $scope.selectedMake, $scope.selectedModel, $scope.selectedTrim).then(function (data) {
            $scope.allCars = data;
        });
    };

    $scope.recall = function (year, make, model) {
        carSvc.recall(year, make, model).then(function (data) {
            $scope.recallData = data;
        });
    };

    $scope.getYears();

    $scope.open = function (id) {
        console.log(id);
        var modalInstance = $modal.open({
            templateUrl: 'modalStuff.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                car: function () {
                    return carSvc.getCar(id);
                }
            }
        });

        modalInstance.result.then(function () {
          
        }, function () {
            
        });
    };

    $scope.tabs = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];


    $scope.gridFunctions = {
        hey: function (input) {
            console.log('clicked');
            alert('hey');
        },
        open: $scope.open

    }
    $scope.gridOptions = {
        columnDefs: [
            { field: 'make' },
            { field: 'model' },
            { field: 'trim' },
            { field: 'body_style' },
            { name: 'Action', cellTemplate: '<button ng-click="getExternalScopes().open(row.entity.Id)">View</button>' }
        ],
        data: 'allCars',
        paginationPageSizes: [10, 25, 50, 75],
        paginationPageSize: 10,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER
    };

    $scope.myStyle = function () {
        var rowHeight = 33;
        var headerHeight = 33;

        return {
            height: (($scope.gridOptions.paginationPageSize * rowHeight) + headerHeight) + "px"
        };
    }

    /*scope.getYears = function () {
        carSvc.getYears().then(function (data) {
            scope.years = data;
        });
    };*/

}]);