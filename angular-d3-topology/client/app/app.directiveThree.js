(function() {
  'use strict';
  angular.module('app.directive.Three', [])
    .directive('parentCanvas', function($window) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: "app/views/canvasSvg.html",
        controller: function($scope, $rootScope) {
          var vm = this;
          this.dcs = [{
            "name": "Lorem","id": "LRM","type": "Standard DC", "coordinates": {"x": 79,"y": 43}
          }, {
            "name": "Ipsum","id": "IPM","type": "Standard DC","coordinates": {"x": 179,"y": 243}
          }, {
            "name": "Dipsum","id": "DPM","type": "Standard DC","coordinates": {"x": 317,"y": 162}
          }];
        },
        controllerAs:'vm',
        link: function(scope, element, attrs) {
          var d3 = $window.d3,svgContainer="",
          svgContainer = d3.select('svg.canvas-ele');
          svgContainer.attr('width', 1024).attr('height', 700);
        }
      }
    })
    .directive('canvasDc',['$compile',function($compile){
      return {
        restrict:'E',
        replace:true,
        template:'<image></image>',
        require:'^parentCanvas',
        scope: {
			    details: '='
		    },
        terminal: true,
        priority: 1000,
        link:function(scope, elem, attrs, parentCanvasCtrl){
          if(angular.isObject(scope.details)){
            var details = scope.details;
                d3.select(elem[0])
                    .attr('x', details.coordinates.x)
                    .attr('y', details.coordinates.y)
                    .attr('width', 45)
                    .attr('height', 45)
                    .attr("xlink:href", 'assests/img/mac-logo.png')
                    .attr('class', 'marker')
                    .attr('uib-tooltip','appears with delay')
                    call(function(){
                        $compile(this[0].parentNode)(scope);
                    });
          }
          //$compile('svg')(scope);
        }
      }
    }]);
})();
