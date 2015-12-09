// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', 'formly', 'formlyBootstrap'])

// configuring our routes
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'app/form.html',
            controller: 'FormController',
            controllerAs:"vm"
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/first)
        .state('form.first', {
            url: '/first',
            templateUrl: 'app/templates/form-first.html'
        })

        // url will be /form/second
        .state('form.second', {
            url: '/second',
            templateUrl: 'app/templates/form-second.html'
        })

        // url will be /form/third
        .state('form.third', {
            url: '/third',
            templateUrl: 'app/templates/form-third.html'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/form/first');
});
