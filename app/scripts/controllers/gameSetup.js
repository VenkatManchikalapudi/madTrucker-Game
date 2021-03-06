'use strict';

/**
 * @ngdoc function
 * @name madTruckerApp.controller:MainCtrl
 * @description
 * # gameSetupCtrl
 * Controller of the madTruckerApp
 */
angular.module('madTruckerApp')
  .controller('gameSetupCtrl', ['$scope', 'bettingService', '$location', function ($scope, bettingService, $location) {

    /*variables setup*/
    $scope.playerName = 'Player 1';
    $scope.initialFunds = 1000;
    $scope.numberOfTruckers = "4";

    /**
     * @ngdoc function
     * @name setupGame
     * @description
     * # setupGame
     * Function that sets up the game values.
     */
   function setupGame(){
     bettingService.playerName = $scope.playerName;
     bettingService.initialFunds = $scope.initialFunds;
     bettingService.playerAccountBalance = $scope.initialFunds;
     bettingService.numberOfTruckers = $scope.numberOfTruckers.indexOf('Choose') > -1 ? 1 : parseInt($scope.numberOfTruckers);
     $location.path( '/game' );

   };

    $scope.setupGame = setupGame;

  }]);
