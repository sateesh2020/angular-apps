(function() {
  'use strict';
  angular.module('app.directive', [])
    .directive('drawTopology', function($window) {
      return {
        restrict: 'E',
        template: "<svg class='canvas-ele' width='1134' height='550'></svg>",
        controller: function($scope, $rootScope) {
          $rootScope.$on('dataCenterDropped', function(event, datacenterDetails) {
            $scope.datacenter = datacenterDetails;
          })
        },
        link: function(scope, element, attrs) {
          var map_factor = 1.096825396825397,
            source = "",
            destination = "",
            svgContainer, pathGroup, markersGroup, lineFunction;
          var d3 = $window.d3;
          scope.$watch('datacenter', function() {
            var details = scope.datacenter;
            var coordinates = {};
            if (details) {
              coordinates.x = details.canvaspoint.x;
              coordinates.y = details.canvaspoint.y;
              coordinates.name = details.datacenter.name;
              coordinates.type = details.datacenter.type;
              placeDatacenter(coordinates);
            }
          });
          svgContainer = d3.select('svg.canvas-ele');
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
            $("g.markersGroup").on("click", "image.marker", selectDatacenter);
          }

          function placeDatacenter(details) {
            //var datacenter = markersGroup.append("g")
            //.attr('class', 'datacenter-group')
            //.attr("transform", "translate(" + details.x + "," + details.y + ")")
            //.attr("width", 100)
            //.attr("height", 80)
            //.attr("data-details", JSON.stringify(details));
            var imageLink = getLogo(details.type);
            var datacenter = markersGroup.append("svg:image")
              .attr('x', details.x)
              .attr('y', details.y)
              .attr('width', 45)
              .attr('height', 45)
              .attr("xlink:href", imageLink)
              .attr('class', 'marker')
              .attr("data-details", JSON.stringify(details));
            var datacenterName = markersGroup.append("text")
              .attr("class", "title")
              .attr('x', Number(details.x))
              .attr('y', Number(details.y) + 65)
              .text(function(d) {
                return details.name;
              });
          }
          function getLogo(osType){
            var imagePath = "";
            switch(osType){
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
          function selectDatacenter(event) {
            var datacenter = $(this);
            var details = $(datacenter).attr('data-details');
            if (!source) {
              source = details;
            } else if (source != details) {
              destination = details;
            } else {
              return;
            }
            verifyAndDrawPath();
          }

          function verifyAndDrawPath() {
            if (!source || !destination)
              return;
            var sourceDetails = JSON.parse(source);
            var destinationDetails = JSON.parse(destination);
            var start = {
              x: Number(sourceDetails.x) + 22,
              y: Number(sourceDetails.y) + 22
            };
            var end = {
              x: Number(destinationDetails.x) + 22,
              y: Number(destinationDetails.y) + 22
            };
            var pathDetails = {
                source:{
                  name:sourceDetails.name,
                  type:sourceDetails.type
                },
                destination:{
                  name:destinationDetails.name,
                  type:destinationDetails.type
                }
            };
            drawPath(start, end,pathDetails);
            fixLineElement(sourceDetails.name, destinationDetails.name)
            source = "", destination = "";
          }

          function equal_range(num, range) {
            if (num >= range.min && num <= range.max) {
              return true;
            }
          }

          function drawPath(start, end, pathDetails) {
            $('.line_s').remove();
            var general_tension = 0.17;
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
            lineFunction = lineFunction.tension(general_tension);
            lineData = [{
              "x": start.x,
              "y": start.y
            }, acs_or_desc, {
              "x": end.x,
              "y": end.y
            }];
            pathGroup.append("path").attr("d", lineFunction(lineData))
                                    .attr("stroke", "#FF9900").attr("stroke-width", 2)
                                    .attr("fill", "none").attr("class", 'line_s')
                                    .attr("data-details",JSON.stringify(pathDetails));
          };
          /* Draw Line End */
          /* Fix Line Start */
          function fixLineElement(source, destination) {
            source = source.replace(/\s/g,'').trim();
            destination = destination.replace(/\s/g,'').trim();
            var uniqueId = source + 'to' + destination;
            $('path').each(function(i, e) {
              if ($(e).attr('id') == uniqueId) {
                $(e).remove();
              }
            });
            var actualLineElement = $('path.line_s');
            $(actualLineElement).attr('id', uniqueId).attr('class', 'fixed_path');
            bindConfigureEvent(uniqueId);
          };
          /* Fix Line End */
          function bindConfigureEvent(elementId){
            $('#'+elementId).bind('click',function(){
              var that = this;
              var pathDetails = $(that).attr('data-details');
              alert(pathDetails);
            })
          }
        }
      }
    });
})();
