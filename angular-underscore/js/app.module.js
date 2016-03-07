(function(){
    'use strict';

    angular.module('angularUnderscore',['app.value'])
            .controller('SimpleController',SimpleController);

    function SimpleController($window,$http,$q,OrderJson){
      var underscore = $window._;
      var vm = this;
      var OrderJson = new OrderJson;
      var segments = {};
      var topologyData = OrderJson.topology;

      //splitSegments();
      findSegmentById();
      function findSegmentById(){
        var segment = underscore.find(topologyData.segments,function(item){
          return item.segmentId == 'SEG-TELECITY-TO-LHC';
        });
        console.log(segment);
      }

      function splitSegments(){
        segments = underscore.indexBy(topologyData.segments,'segmentId');
        console.log(segments);
      }
    }
})();
