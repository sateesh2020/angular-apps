(function() {
  'use strict';
  angular.module('app.directive', [])
    .directive('networkCanvas', function($window,modalService) {
      return {
        restrict: 'EA',
        template: "<svg width='800' height='490'></svg>",
        link: function(scope, element, attrs) {
          var firstClick = false,
            map_factor = 1.096825396825397,
            source = "",
            destination = "",
            svgContainer, pathGroup, markersGroup,lineFunction;
          var dataCenters = scope.vm.dataCenters;
          var d3 = $window.d3;

          lineFunction = d3.svg.line().tension(0.17).x(function(d) {
            return d.x;
          }).y(function(d) {
            return d.y;
          }).interpolate('bundle');

          pathGroup = d3.select('svg')
            .append('g')
            .attr('class', 'pathGroup');
          markersGroup = d3.select('svg').append('g')
            .attr('class', 'markersGroup');
          var circles = markersGroup.selectAll("circle")
            .data(dataCenters)
            .enter()
            .append("circle");

          var circleAttributes = circles
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            })
            .attr("r", function(d) {
              return 10;
            })
            .attr('class', 'marker')
            .attr('id', function(d) {
              return d.id;
            })
            .style("fill", "#00FF99");
          $('.marker').on('click', function(ev) {
            click_event(ev);
          });

          function click_event(event) {
            if (!firstClick) {
              source = event.target.id || 'S';
              scope.vm.formData.source = source;
              bind_interatcive_path(event, 'svg', 'svg');
            } else {
              destination = event.target.id || 'D';
              scope.vm.formData.destination = destination;
              unbind_interactive_path(event, 'svg', 'svg');
              fixLineElement(source, destination);
            }
          }

          function bind_interatcive_path(event, box, element) {
            firstClick = true;
            var startPoint = {
              x: event.pageX - $(box).offset().left,
              y: event.pageY - $(box).offset().top
            }
            $(element).bind('mousemove', function(event) {
              var x = event.pageX - $(box).offset().left;
              var y = event.pageY - $(box).offset().top;
              var coord = {
                x: x,
                y: y
              };
              redraw_line_on_change(startPoint, coord);
            });
          }

          function unbind_interactive_path(event, box, element) {
            firstClick = false;
            $(element).unbind('mousemove');
          }

          function equal_range(num, range) {
            if (num >= range.min && num <= range.max) {
              return true;
            }
          }

          function redraw_line_on_change(start, end) {
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
            //console.log(start,line_length,moduler,y_moduler,acs_or_desc,y_long_moduler,end);
            lineFunction = lineFunction.tension(general_tension);
            lineData = [{
              "x": start.x,
              "y": start.y
            }, acs_or_desc, {
              "x": end.x,
              "y": end.y
            }];
            //console.log(lineData);
            //console.log(lineFunction(lineData));
            pathGroup.append("path").attr("d", lineFunction(lineData)).attr("stroke", "#FF9900").attr("stroke-width", 2).attr("fill", "none").attr("class", 'line_s');
          };

          function fixLineElement(source, destination) {
            var uniqueId = source + 'to' + destination;
            $('path').each(function(i, e) {
              if ($(e).attr('id') == uniqueId) {
                $(e).remove();
              }
            });
            var actualLineElement = $('path.line_s');
            $(actualLineElement).attr('id', uniqueId).attr('class', 'fixed_path');
            bind_path_event(uniqueId);
          };

          function bind_path_event(elementId){
            $('#'+elementId).bind('click',function(event){
                  var modalDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: 'app/views/data_form.html',
                    scope:scope
                  };
                  var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Submit',
                    headerText: 'Let us know your requirement'
                  };
                  modalService.showModal(modalDefaults, modalOptions).then(function(result) {
                    scope.vm.topologyData[source+'to'+destination] = scope.vm.formData;
                    scope.vm.formData = {};
                  });
            });
          }
        }
      }
    });
})();
