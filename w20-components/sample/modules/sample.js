define([
    '{angular}/angular',
    '{angular-resource}/angular-resource'
], function(angular) {
    'use strict';

	var module = angular.module('sample', ['ngResource',  'w20ComponentsGrid','ui.grid.selection', 'ui.grid.edit']);

	module.controller('SampleController', [ '$scope', function($scope) {

        $scope.gridOptions = {
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            },
            
            data:[ 
                {
                    firstName: "Cox",
                    lastName: "Carney",
                    company: "Enormo",
                    employed: true
                },
                {
                    firstName: "Lorraine",
                    lastName: "Wise",
                    company: "Comveyer",
                    employed: false
                },
                {
                    firstName: "Nancy",
                    lastName: "Waters",
                    company: "Fuelton",
                    employed: false
                }
              ]
        };

	}]);

	return {
		angularModules : [ 'sample' ]
	};
});
