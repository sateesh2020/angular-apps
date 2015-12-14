(function() {
  'use strict';
  angular.module('app.controllers', [])
    .controller('CanvasController', CanvasController);

  function CanvasController() {
      var vm = this;
      vm.dataCenters = [
              {"x": 145,"y": 300,"id":"S1" },
              {"x": 455,"y": 35,"id":"S2"  },
              {"x": 705,"y": 362,"id":"S3" }
            ];
      vm.formData={};
      vm.topologyData = {};
  }
})();
