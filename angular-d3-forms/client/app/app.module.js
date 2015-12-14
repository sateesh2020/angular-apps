(function() {
  'use strict';
  // create our angular app and inject dependencies
  // =============================================================================
  angular.module('angulard3', ['ngAnimate', 'ui.router', 'ui.bootstrap',
    'app.controllers','app.services','app.directive'
  ])

  // configuring our routes
  // =============================================================================
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // route to show our basic canvas (/canvas)
      .state('canvas', {
      url: '/canvas',
      templateUrl: 'app/views/canvas.html',
      controller: 'CanvasController',
      controllerAs: "vm"
    });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/canvas');
  });


})();
