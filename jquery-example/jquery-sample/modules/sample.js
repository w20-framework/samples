define([
    'require',
    'jquery',
    '{angular}/angular',
    '{angular-resource}/angular-resource'
], function (require, $, angular) {
    'use strict';
    var module = angular.module('sample', ['ngResource','ngAnimate','ui.bootstrap']);

    module.controller('SampleController', ['$scope',  function ($scope) {
        $scope.jqversion = $.fn.jquery;
        // Sample 1
        $.jGrowl("Hello world!");
        // Sample 2
        $.jGrowl("Stick this!", { sticky: true });
        // Sample 3
        $.jGrowl("A message with a header", { header: 'Important' });
        // Sample 4
        $.jGrowl("A message that will live a little longer.", { life: 10000 });
        // Sample 5
        $.jGrowl("A message with a beforeOpen callback and a different opening animation.", {
            beforeClose: function(e,m) {
                alert('About to close this notification!');
            },
            animateOpen: {
                height: 'show'
            }
        });
    }]);
    module.controller('AccordionController', ['$scope',  function ($scope) {
        $scope.oneAtATime = true;

        $scope.groups = [
            {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
            },
            {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }]);
    module.controller('AlertController', ['$scope', function($scope){
        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
          ];
        
          $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
          };
        
          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };
    }]);
    module.controller('ButtonsController', ['$scope', function($scope){
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';
      
        $scope.checkModel = {
          left: false,
          middle: true,
          right: false
        };
      
        $scope.checkResults = [];
      
        $scope.$watchCollection('checkModel', function () {
          $scope.checkResults = [];
          angular.forEach($scope.checkModel, function (value, key) {
            if (value) {
              $scope.checkResults.push(key);
            }
          });
        });
    }]);
    module.controller('DatePickerController', ['$scope', function($scope){
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
    
        $scope.clear = function() {
            $scope.dt = null;
        };
    
        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };
    
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
    
        $scope.toggleMin = function() {
            $scope.options.minDate = $scope.options.minDate ? null : new Date();
        };
    
        $scope.toggleMin();
    
        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };
    
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
        ];
    
        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);
        
                for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
        
                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
                }
            }
        
            return '';
        }
    }]);
    module.controller('ModalController', ['$scope', '$uibModal', '$document', function($scope, $uibModal, $document){
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size, parentSelector) {
            var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                    items: /*@ngInject*/function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.openComponentModal = function () {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                component: 'modalComponent',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                }, function () {
                console.info('modal-component dismissed at: ' + new Date());
            });
        };

        $scope.openMultipleModals = function () {
            $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: ['$scope', function($scope) {
                    $scope.name = 'bottom';  
                }]
            });

            $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: ['$scope', function($scope) {
                    $scope.name = 'top';  
                }]
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    }]);
    module.controller('ModalInstanceCtrl', ['$uibModalInstance', 'items', function ($uibModalInstance, items) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.selected = {
          item: $ctrl.items[0]
        };
      
        $ctrl.ok = function () {
          $uibModalInstance.close($ctrl.selected.item);
        };
      
        $ctrl.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
    }]);
    module.component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
          resolve: '<',
          close: '&',
          dismiss: '&'
        },
        controller: function () {
          var $ctrl = this;
      
          $ctrl.$onInit = function () {
            $ctrl.items = $ctrl.resolve.items;
            $ctrl.selected = {
              item: $ctrl.items[0]
            };
          };
      
          $ctrl.ok = function () {
            $ctrl.close({$value: $ctrl.selected.item});
          };
      
          $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
          };
        }
    });
    return {
        angularModules: ['sample']
    };
});