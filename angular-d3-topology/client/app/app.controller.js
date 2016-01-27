(function() {
  'use strict';
  angular.module('app.controllers', [])
    .controller('CanvasController', CanvasController);

  function CanvasController($rootScope , topologyService) {
      var vm = this;
      vm.dataCenters = [
          { "id": 1,"type":"Linux", "name": "Banglore"},
          { "id": 2,"type":"Windows", "name": "Hyderabad"},
          { "id": 3,"type":"Linux", "name": "Mumbai"},
          { "id": 4,"type":"Mac", "name": "Delhi"},
          { "id": 5,"type":"Linux", "name":"Kolkata"},
          { "id": 6,"type":"Windows", "name": "Chennai" },
          { "id": 7,"type":"Linux", "name": "Kerala" },
          { "id": 8,"type":"Mac", "name": "Trivandrum" }
    ]
      vm.savedTopology = {
      	"topology": [{
      		"source": {
      			"name": "Banglore",
      			"type": "Linux",
      			"coordinates": {
      				"x": 100,
      				"y": 234
      			}
      		},
      		"destination": {
      			"name": "Delhi",
      			"type": "Mac",
      			"coordinates": {
      				"x": 300,
      				"y": 200
      			}
      		}
      	},
        {
      		"source": {
      			"name": "Chennai",
      			"type": "Windows",
      			"coordinates": {
      				"x": 200,
      				"y": 400
      			}
      		},
      		"destination": {
      			"name": "Delhi",
      			"type": "Mac",
      			"coordinates": {
      				"x": 400,
      				"y": 200
      			}
      		}
      	}]
      }
      vm.formData={};
      vm.topologyData = {};
      vm.droppedDatacenters = [];
    vm.onDropComplete = function(data,event){
      var index = vm.droppedDatacenters.indexOf(data);
      if (index == -1){
        var details = {};
        var points = {};
        details.name = data.name;
        details.type = data.type;
        points.x = event.event.offsetX;
        points.y = event.event.offsetY;
        details.coordinates = points;
        details.connectedTo = [];
        vm.droppedDatacenters.push(details);
        topologyService.setDroppedDatacenters(details);
        $rootScope.$broadcast('dataCenterDropped',details);
      }
    }
  }
})();
