define([
    '{angular}/angular',
    '{angular-resource}/angular-resource'
], function(angular) {
    'use strict';

	var module = angular.module('form', ['ngResource',]);
	module.controller('FormController', [ '$scope', function($scope) {
        var vm = this;
        vm.form = {
            model: {},
            fields: [{ key: 'name', type: 'text', templateOptions: { label: 'Name' }}],
            submit: function () {alert('form submitted!')}
        }
	}]);

	return {
		angularModules : [ 'form' ]
	};
});