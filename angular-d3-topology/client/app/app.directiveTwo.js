(function() {
  'use strict';
  angular.module('app.directiveTwo', [])
    .directive('canvasTopology', function($window, topologyService) {
      return {
        restrict: 'E',
        template: "<svg class='canvas-ele'></svg>"+
        "<div class='switch toggle'><input id='toggleDrag' class='cmn-toggle cmn-toggle-round-flat' type='checkbox'>"+
        "<label for='toggleDrag'></label></div>",
        controller: function($scope, $rootScope) {
          var source = "",
            destination = "";
          $scope.selectedDatacenters = [];
          $scope.topologiesApi = topologyService;
          $scope.$watch(function() {
            return topologyService.droppedDatacenters;
          }, function() {
            $scope.selectedDatacenters = [];
            $scope.selectedDatacenters = topologyService.droppedDatacenters;
          }, true);

          $scope.savedTopology = {
            "topology": [{
              "source": {
                "name": "Banglore",
                "type": "Linux",
                "coordinates": {
                  "x": 100,
                  "y": 50
                }
              },
              "destination": {
                "name": "Delhi",
                "type": "Mac",
                "coordinates": {
                  "x": 900,
                  "y": 200
                }
              }
            }, {
              "source": {
                "name": "Banglore",
                "type": "Linux",
                "coordinates": {
                  "x": 100,
                  "y": 50
                }
              },
              "destination": {
                "name": "Chennai",
                "type": "Windows",
                "coordinates": {
                  "x": 450,
                  "y": 400
                }
              }
            }, {
              "source": {
                "name": "Chennai",
                "type": "Windows",
                "coordinates": {
                  "x": 450,
                  "y": 400
                }
              },
              "destination": {
                "name": "Delhi",
                "type": "Mac",
                "coordinates": {
                  "x": 900,
                  "y": 200
                }
              }
            }]
          }
        },
        link: function(scope, element, attrs) {
          var map_factor = 1.096825396825397,
            source = "",
            destination = "",
            width = 1143,
            height = 550,
            datacenterIconIdentifier = '_icon',
            datacenterLabelIdentifier = '_label',
            dcHighlightClass = 'dc-highlight',
            datacenterIconWidth = 45,
            datacenterIconHeight = 45,
            datacenterLabelOffsetX = 0,
            datacenterLabelOffsetY = 75,
            overFlowX = datacenterIconWidth/2,
            overFlowY = datacenterIconHeight/2,
            overFlowWidth = width - datacenterIconWidth,
            overFlowHeight = height - datacenterLabelOffsetY,
            lineStartOffsetX = 22,
            lineStartOffsetY = 25,
            lineEndOffsetX = 22,
            lineEndOffsetY = 25,
            dataCentersArray = [],
            svgContainer, pathGroup, markersGroup,
            lineFunction, drag , currentDraggingElemIndex = -1, isFirstClick = true;
          var d3 = $window.d3;
          svgContainer = d3.select('svg.canvas-ele');
          svgContainer.attr('width',width).attr('height',height);
          //svgContainer.prepend('button').attr('class','toggle btn btn-info').attr('id','toggleDrag').text('Drag');
          setUpCanvas();


          lineFunction = d3.svg.line().tension(0.17).x(function(d) {
            return d.x;
          }).y(function(d) {
            return d.y;
          }).interpolate('bundle');

          function setUpCanvas() {
            pathGroup = svgContainer
              .append('g')
              .attr('class', 'pathGroup');
            markersGroup = svgContainer.append('g')
              .attr('class', 'markersGroup');
          }
          //$('g.markersGroup').on('click','.marker',doubleClicked);

          $('#toggleDrag').click(function(){
            if(isFirstClick){
              d3.selectAll('.marker').call(drag);
              d3.select('svg').attr('cursor','move');
              isFirstClick = false;
              console.log('Enabled Drag');
            }else{
              d3.selectAll('.marker').on('.drag',null);
              d3.select('svg').attr('cursor','pointer');
              console.log('Disabled Drag');
              isFirstClick = true;
            }
          });

          drag = d3.behavior.drag()
                    .on("dragstart",function(){
                        d3.event.sourceEvent.stopPropagation();
                        var elemName = d3.select(this).attr('data-name');
                        var availDataCenters = topologyService.droppedDatacenters;
                        for(var i =0 ; i< availDataCenters.length ; i++ ){
                          if(availDataCenters[i]['name'] == elemName){
                            currentDraggingElemIndex = i;
                          }
                        }
                    })
                    .on("drag", function(d,i) {
                      console.log('Dragging');
                      var coordinates = {},iconId,labelId;
                      coordinates.x = Math.max(overFlowX, Math.min(overFlowWidth - overFlowX, d3.event.x));
                      coordinates.y = Math.max(overFlowY, Math.min(overFlowHeight - overFlowY, d3.event.y));
                      iconId   = d3.select(this).attr('data-name')+datacenterIconIdentifier;
                      labelId  = d3.select(this).attr('data-name')+datacenterLabelIdentifier;
                      if(currentDraggingElemIndex != -1){
                        topologyService.droppedDatacenters[currentDraggingElemIndex]['coordinates']['x'] = coordinates.x;
                        topologyService.droppedDatacenters[currentDraggingElemIndex]['coordinates']['y'] = coordinates.y;
                        $('#'+iconId).attr('x',coordinates.x).attr('y',coordinates.y);
                        $('#'+labelId).attr('x',Number(coordinates.x)+datacenterLabelOffsetX).attr('y',Number(coordinates.y)+datacenterLabelOffsetY);
                      }
                    })
                    .on("dragend",function(){
                      console.log('Drag End');
                      var updatedTopology = topologyService.droppedDatacenters;
                      drawTopology(updatedTopology);
                    });
          scope.$watch('selectedDatacenters', function(newVal, oldVal) {
            dataCentersArray = topologyService.getDroppedDatacenters();
            drawTopology(dataCentersArray);
          }, true);
          var doubleClicked = function() {
            console.log('Double Clicked');
            var datacenter = $(this);
            var details = $(datacenter).attr('data-name');
            var datacenterAxis = {
              x: datacenter.attr('x'),
              y: datacenter.attr('y')
            }
            if (!source) {
              source = details;
              highlightDatacenter(datacenterAxis, dcHighlightClass);
            } else if (source != details) {
              destination = details;
              addConnectedTo(source,destination);
              removeHighlight(dcHighlightClass);
              drawTopology(dataCentersArray);
            } else {
              return;
            }
          }

          function highlightDatacenter(datacenterAxis,typeOfNode){
              markersGroup.append("circle")
                          .attr("cx", Number(datacenterAxis.x)+22)
                          .attr("cy", Number(datacenterAxis.y)+25)
                          .attr("r", 35)
                          .attr("style","fill:none;stroke: #666699")
                          .attr('class',typeOfNode);
          }
          function removeHighlight(dcHighlightClass){
            $('.'+dcHighlightClass).remove();
          }

          function addConnectedTo(src,dtc){
            var allDataCenters = topologyService.getDroppedDatacenters();
            for(var i = 0; i< allDataCenters.length ; i++){
              if(allDataCenters[i].name == src){
                allDataCenters[i]['connectedTo'].push(dtc);
                topologyService.droppedDatacenters = allDataCenters;
                source = "",destination = "";
                return;
              }
            }
          }

          function drawTopology(topology) {
            for (var i = 0; i < topology.length; i++) {
              var source = topology[i];
              var connections = source.connectedTo;
              placeDataCenterIcon(source);
              placeDataCenterLabel(source);
              if(connections.length > 0){
                for(var j = 0 ; j < connections.length ; j++){
                  for(var k = 0 ; k < topology.length ; k++ ){
                    if( topology[k]['name'] == connections[j] ){
                      var destination = topology[k];
                      var obj = {};
                      obj.source = source;
                      obj.destination = destination;
                      drawPath(obj);
                    }
                  }
                }
              }
            }
          }

          function placeDataCenterIcon(details, type) {
              var iconId = details.name+datacenterIconIdentifier;
              $('#'+iconId).remove();
              var imageLink = getLogo(details.type);
              var datacenter = markersGroup.append("svg:image")
                .attr('x', details.coordinates.x)
                .attr('y', details.coordinates.y)
                .attr('width', datacenterIconWidth)
                .attr('height', datacenterIconHeight)
                .attr("xlink:href", imageLink)
                .attr('class', 'marker')
                .attr('id', details.name + datacenterIconIdentifier)
                .attr("data-name", details.name)
                .on('dblclick',doubleClicked)
                //.call(drag)
                .attr("data-type", details.type);
          }

          function placeDataCenterLabel(details, type) {
            var iconLabel = details.name+datacenterLabelIdentifier;
            $('#'+iconLabel).remove();
              markersGroup.append("text")
                .attr("class", "label")
                .attr("id", details.name + datacenterLabelIdentifier)
                .attr('x', Number(details.coordinates.x) + datacenterLabelOffsetX)
                .attr('y', Number(details.coordinates.y) + datacenterLabelOffsetY)
                .text(function(d) {
                  return details.name;
                });
          }

          function getLogo(osType) {
            var imagePath = "";
            switch (osType) {
              case 'Mac':
                imagePath = 'assests/img/mac-logo.png';
                break;
              case 'Windows':
                imagePath = 'assests/img/windows-logo.png';
                break;
              case 'Linux':
                imagePath = 'assests/img/ubuntu-logo.png';
                break;
            }
            return imagePath;
          }

          function equal_range(num, range) {
            if (num >= range.min && num <= range.max) {
              return true;
            }
          }

          function drawPath(pathDetails) {
            var start = {
                x: pathDetails.source.coordinates.x,
                y: pathDetails.source.coordinates.y
              },
              end = {
                x: pathDetails.destination.coordinates.x,
                y: pathDetails.destination.coordinates.y
              };
            var general_tension = 0.17;
            var sourceName      = pathDetails.source.name.replace(/\s/g, '').trim(),
                destinationName = pathDetails.destination.name.replace(/\s/g, '').trim(),
                pathId = sourceName+'to'+destinationName;
            $('#'+pathId).remove();
            var line_length = Math.ceil(Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y))),
              lineData,
              moduler = 1,
              y_moduler = 1,
              acs_or_desc,
              y_long_moduler = 0;
            /*  mathematical crap  */
            if (start.x > end.x) {
              moduler = -1;
            }
            if (line_length < 200) {
              y_moduler = 2 - ((line_length - 100) / 100);
            } // 200 - 1, 100 - 2, 0 - 3
            if (line_length > 160 && equal_range(end.y, {
                min: start.y - 200,
                max: start.y + 200
              })) {
              y_long_moduler = line_length * 0.4 * ((line_length - 160) / 180);
            }
            if (start.y > end.y) {
              if (start.x < end.x) {
                moduler = -1;
              } else {
                moduler = 1;
              }
              acs_or_desc = {
                "x": end.x + (line_length * 0.5 * moduler),
                "y": end.y - (line_length * 0.5 * y_moduler)
              };
            } else {
              acs_or_desc = {
                "x": start.x + (line_length * 0.5 * moduler),
                "y": start.y - (line_length * 0.5 * y_moduler)
              };
            }
            general_tension = 0.17;
            if ((start.x == 175 * map_factor || start.x == 276 * map_factor) && // it's for JPN --> SGP
              (start.y == 299 * map_factor || start.y == 129 * map_factor) && (end.x == 175 * map_factor || end.x == 276 * map_factor) && (end.y == 299 * map_factor || end.y == 129 * map_factor)) {
              acs_or_desc = {
                "x": 400 * map_factor,
                "y": 250 * map_factor
              };

            }
            /*  /mathematical crap  */
            lineData = [{
              "x": Number(start.x) + lineStartOffsetX,
              "y": Number(start.y) + lineStartOffsetY
            }, acs_or_desc, {
              "x": Number(end.x) + lineEndOffsetX,
              "y": Number(end.y) + lineEndOffsetY
            }];
            lineFunction = lineFunction.tension(general_tension);
            pathGroup.append("path").attr("d", lineFunction(lineData))
              .attr("stroke", "#FF9900").attr("stroke-width", 3)
              .attr("fill", "none").attr("class", 'line_s')
              .attr('id',pathId).attr('data-from',sourceName).attr('data-to',destinationName)
              .attr("data-details", JSON.stringify(pathDetails));
          };
          /* Draw Line End */

          /* Bind Click Event for Path End */
          function bindConfigureEvent(elementId) {
            $('#' + elementId).bind('click', function() {
              var that = this;
              var pathDetails = $(that).attr('data-details');
              alert(pathDetails);
            })
          }
        }
      }
    });
})();
