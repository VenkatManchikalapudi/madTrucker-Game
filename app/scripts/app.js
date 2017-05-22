'use strict';

/**
 * @ngdoc overview
 * @name madTruckerApp
 * @description
 * # madTruckerApp
 *
 * Main module of the application.
 */
angular
  .module('madTruckerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .when('/gameSetup', {
        templateUrl: 'views/gameSetup.html',
        controller: 'gameSetupCtrl',
        controllerAs: 'gameSetup'
      })
      .otherwise({
        redirectTo: '/game'
      });
  });
