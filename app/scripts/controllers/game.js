'use strict';

/**
 * @ngdoc function
 * @name madTruckerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the madTruckerApp
 */
angular.module('madTruckerApp')
  .controller('GameCtrl', ['$scope', 'bettingService', '$location', function ($scope, bettingService, $location) {
    $scope.numberOfTruckers = bettingService.numberOfTruckers;
    $scope.playerAccountBalance = parseInt(bettingService.playerAccountBalance);
    $scope.truckerBets = [];
    $scope.alertPlayerOfInsufficientBalance = false;
    (function(){
      for(let i=1; i<=$scope.numberOfTruckers; i++){
        $scope.truckerBets.push({
          'id': i,
          'name': 'trucker' + i,
          'bet': 0
        });
      }
    })();

    function setupTruckerBets(modalId){
      $scope.alertPlayerOfInsufficientBalance = false;
      bettingService.truckerBets = $scope.truckerBets;
      let totalBet = 0;
      _.each($scope.truckerBets, function(truckerBet) {
          totalBet += truckerBet.bet;
      });
      if(totalBet > bettingService.playerAccountBalance){
        $scope.alertPlayerOfInsufficientBalance = true;
      }else{
        angular.element(modalId).modal("hide");
      }
    };

    $scope.setupTruckerBets = setupTruckerBets;

    function startRace(){
      $scope.winnerTrucker = Math.floor(Math.random()* ($scope.numberOfTruckers + 1));
      _.each($scope.truckerBets, function(truckerBet){
          if(truckerBet.id === $scope.winnerTrucker){
            $scope.playerAccountBalance = ($scope.playerAccountBalance + (2 * truckerBet.bet));
          }else{
            $scope.playerAccountBalance = ($scope.playerAccountBalance - truckerBet.bet);
          }
      })
      bettingService.truckerBets = $scope.truckerBets;
    };

    $scope.startRace = startRace;

    function placeBets(modalId){
      $scope.alertPlayerOfInsufficientBalance = false;
      angular.element(modalId).modal({backdrop: "static"});
    };
    $scope.placeBets = placeBets;

    function resetGame(){
      $location.path( '/gameSetup' );
    };
    $scope.resetGame = resetGame;

  }]);
