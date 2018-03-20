define([
    '{angular}/angular',
    '{angular-resource}/angular-resource'
], function(angular) {
    'use strict';

	var module = angular.module('sample', ['ngResource',  'w20ComponentsGrid','ui.grid.selection', 'ui.grid.edit']);

	module.controller('SampleController', [ '$scope', function($scope) {
        $scope.getEmployedValue = function(grid, row){
            return row.entity.employed ? "grid.content.employed.true" : "grid.content.employed.false";
        };
        $scope.gridOptions = {
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            },
            columnDefs : [
                {
                    field: 'firstName',
                    displayName: 'grid.header.firstName',
                    headerCellTemplate: 'sample/views/headerTemplate.html'
                },
                {
                    field: 'lastName',
                    displayName: 'grid.header.lastName',
                    headerCellTemplate: 'sample/views/headerTemplate.html'
                },
                {
                    field: 'company',
                    displayName: 'grid.header.company',
                    headerCellTemplate: 'sample/views/headerTemplate.html'
                },
                {
                    field: 'employed',
                    displayName: 'grid.header.employed',
                    headerCellTemplate: 'sample/views/headerTemplate.html',
                    cellTemplate:'<div class="ui-grid-cell-contents">{{ grid.appScope.getEmployedValue(grid, row) | localize }}</div>' 
                }
            ],
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
