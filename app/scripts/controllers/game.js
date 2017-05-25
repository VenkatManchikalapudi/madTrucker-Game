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
    $scope.winningAmount = 0;
    $scope.winnerTrucker = 0;
    $scope.raceStarting = true;
    $scope.betsSet = false;
    $scope.truckerColors = ['null', 'Purple', 'Red', 'Blue', 'Green', 'Yellow', 'Black'];

    (function(){
      for(let i=1; i<=$scope.numberOfTruckers; i++){
        $scope.truckerBets.push({
          'id': i,
          'name': 'Trucker ' + i,
          'bet': 0,
          'color': $scope.truckerColors[i]
        });
      }
    })();

    function setupTruckerBets(modalId){
      bettingService.truckerBets = $scope.truckerBets;
      let totalBet = 0;
      _.each($scope.truckerBets, function(truckerBet) {
          totalBet += truckerBet.bet;
      });
      if(totalBet > bettingService.playerAccountBalance){
        $scope.betsSet = false;
        $scope.alertPlayerOfInsufficientBalance = true;
      }else{
        if(totalBet === 0){
          $scope.betsSet = false;
          return;
        }
        angular.element(modalId).modal("hide");
        $scope.betsSet = true;
      }
    };

    $scope.setupTruckerBets = setupTruckerBets;

    function startRace(){
      $scope.winnerTrucker = Math.floor(Math.random()* ($scope.numberOfTruckers + 1));
      _.each($scope.truckerBets, function(truckerBet){
          if(truckerBet.id === $scope.winnerTrucker){
            $scope.playerAccountBalance = (($scope.playerAccountBalance - truckerBet.bet) + (2 * truckerBet.bet));
            $scope.winningAmount = truckerBet.bet;
          }else{
            $scope.playerAccountBalance = ($scope.playerAccountBalance - truckerBet.bet);
          }
        truckerBet.bet = 0;
      });
      $scope.betsSet = false;
      $scope.totalBet = 0;
      $scope.raceStarting = false;
      bettingService.truckerBets = $scope.truckerBets;
    };

    $scope.startRace = startRace;

    function placeBets(modalId){
      $scope.raceStarting = true;
      $scope.alertPlayerOfInsufficientBalance = false;
      $scope.totalBet = 0;
      angular.element(modalId).modal({backdrop: "static"});
    };
    $scope.placeBets = placeBets;

    function resetGame(){
      $location.path( '/gameSetup' );
    };
    $scope.resetGame = resetGame;

    function calcTotalBet(){
      let totalBet = 0;
      _.each($scope.truckerBets, function(truckerBet) {
        totalBet += truckerBet.bet;
      });
      $scope.totalBet = isNaN(totalBet) ? 0 : totalBet;
    }

    $scope.calcTotalBet = calcTotalBet;

  }]);
