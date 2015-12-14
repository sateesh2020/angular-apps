(function() {
  angular.module('app.services', [])
    .service('modalService', ['$uibModal',
      function($modal) {
        var modalDefaults = {
          backdrop: true,
          keyboard: true,
          modalFade: true,
          templateUrl: 'app/views/customModal.html'
        };

        var modalOptions = {
          closeButtonText: 'Close',
          actionButtonText: 'OK',
          headerText: 'Proceed?',
          bodyText: 'Perform this action?',
          isOtherActions: false,
          otherActionOneText: 'ActionOne',
          otherActionTwoText: 'ActionTwo',
          otherActionOneData: 'ActionOne',
          otherActionTwoData: 'ActionTwo'
        };

        this.showModal = function(customModalDefaults, customModalOptions) {
          if (!customModalDefaults) customModalDefaults = {};
          customModalDefaults.backdrop = 'static';
          return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function(customModalDefaults, customModalOptions) {
          //Create temp objects to work with since we're in a singleton service
          var tempModalDefaults = {};
          var tempModalOptions = {};

          //Map angular-ui modal custom defaults to modal defaults defined in service
          angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

          //Map modal.html $scope custom properties to defaults defined in service
          angular.extend(tempModalOptions, modalOptions, customModalOptions);

          if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function($scope, $uibModalInstance) {
              $scope.modalOptions = tempModalOptions;
              $scope.modalOptions.ok = function(result) {
                $uibModalInstance.close(result);
              };
              $scope.modalOptions.close = function(result) {
                $uibModalInstance.dismiss('cancel');
              };
              $scope.modalOptions.actionOne = function(result) {
                $uibModalInstance.close(result);
              };
              $scope.modalOptions.actionTwo = function(result) {
                $uibModalInstance.close(result);
              };
            }
          }

          return $modal.open(tempModalDefaults).result;
        };

      }
    ]);
})();
