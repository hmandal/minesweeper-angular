'use strict';
/**
 * @ngdoc overview
 * @name minesweeperAngularApp
 * @description
 * # minesweeperAngularApp
 *
 * Main module of the application.
 */
angular.module('minesweeperAngularApp', ['ngResource', 'ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
    }).when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
    }).otherwise({
        redirectTo: '/'
    });
}).directive('ngRightClick', ['$parse', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {
                    $event: event
                });
            });
        });
    };
}]);