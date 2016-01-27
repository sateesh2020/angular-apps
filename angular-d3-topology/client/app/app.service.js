(function() {
  angular.module('app.services', [])
    .factory('topologyService', function() {
      var services = {
        topology: {
          source:null,
          destination:null
        },
        topologies:[],
        droppedDatacenters:[],
        currentIndex:-1,
        setTopologySource: setTopologySource,
        setDroppedDatacenters:setDroppedDatacenters,
        getDroppedDatacenters:getDroppedDatacenters,
        setTopologyDestination:setTopologyDestination,
        getAllTopologies: getAllTopologies,
        removeTopology:removeTopology,
        saveTopology: saveTopology,
        retriveTopology: retriveTopology
      };
      return services;

      function setTopologySource(source) {
        this.topology.source = source;
        this.topologies.push(this.topology);
        this.currentIndex += 1;
      }

      function setTopologyDestination(destination) {
        this.topology.destination = destination;
        this.topologies[this.currentIndex].destination = destination;
        this.topology = {source:null,destination:null};
      }

      function setDroppedDatacenters(datacenter){
        this.droppedDatacenters.push(datacenter);
      }

      function getDroppedDatacenters(){
        return this.droppedDatacenters;
      }
      
      function getAllTopologies() {
        return this.topologies;
      }

       function removeTopology(){

      }

      function saveTopology(topologyData) {

      }

      function retriveTopology() {

      }
    });

})();
