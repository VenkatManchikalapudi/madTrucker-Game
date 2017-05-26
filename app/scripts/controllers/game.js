'use strict';

/**
 * @ngdoc function
 * @name madTruckerApp.controller:gameCtrl
 * @description
 * # gameCtrl
 * Controller of the madTruckerApp
 */
angular.module('madTruckerApp')
  .controller('gameCtrl', ['$scope', 'bettingService', '$location', function ($scope, bettingService, $location) {

    /*variables used for different states of the game*/
    $scope.numberOfTruckers = bettingService.numberOfTruckers;
    $scope.playerName = bettingService.playerName;
    $scope.playerAccountBalance = parseInt(bettingService.playerAccountBalance);
    $scope.truckerBets = [];
    $scope.winningAmount = 0;
    $scope.winnerTrucker = 0;
    $scope.raceStarting = true;
    $scope.betsSet = false;
    $scope.truckerColors = ['null', 'Purple', 'Red', 'Blue', 'Green', 'Yellow', 'Black'];

    /*populate the trucker bets array. This array is the state of the race at any point.*/
    (function(){
      for(let i=1; i<=$scope.numberOfTruckers; i++){
        $scope.truckerBets.push({
          'id': i,
          'name': 'Trucker ' + i,
          'bet': 0,
          'color': $scope.truckerColors[i],
          'rand': 0
        });
      }
    })();

    /**
     * @ngdoc function
     * @name setupTruckerBets
     * @description
     * # setupTruckerBets
     * Function that sets up the bets for the truckers. Runs on the button click from the modal.
     */
    function setupTruckerBets(modalId){
      bettingService.truckerBets = $scope.truckerBets;
      $scope.calcTotalBet();
      if($scope.totalBet > $scope.playerAccountBalance){
        $scope.betsSet = false;
      }else{
        if($scope.totalBet === 0){
          $scope.betsSet = false;
          return;
        }
        angular.element(modalId).modal("hide");
        $scope.betsSet = true;
      }
    };

    $scope.setupTruckerBets = setupTruckerBets;

    /**
     * @ngdoc function
     * @name startRace
     * @description
     * # startRace
     * Function that picks a random winner
     */
    function startRace(){
      $scope.winnerTrucker = $scope.random($scope.numberOfTruckers) + 1;
      _.each($scope.truckerBets, function(truckerBet){
          if(truckerBet.id === $scope.winnerTrucker){
            $scope.playerAccountBalance = (($scope.playerAccountBalance - truckerBet.bet) + (2 * truckerBet.bet));
            $scope.winningAmount = truckerBet.bet;
          }else{
            $scope.playerAccountBalance = ($scope.playerAccountBalance - truckerBet.bet);
            truckerBet.rand = $scope.random(3);
          }
        //truckerBet.bet = 0;
      });
      $scope.betsSet = false;
      $scope.totalBet = 0;
      $scope.raceStarting = false;
      bettingService.truckerBets = $scope.truckerBets;
    };

    $scope.startRace = startRace;

    /**
     * @ngdoc function
     * @name openBettingInterface
     * @description
     * # openBettingInterface
     * Function that opens the betting interface in the modal window.
     */
    function openBettingInterface(modalId){
      if($scope.totalBet > $scope.playerAccountBalance || !$scope.raceStarting){
        $scope.clearBets();
      }
      $scope.raceStarting = true;
      $scope.winningAmount = 0;
      /*$scope.totalBet = 0;*/
      angular.element(modalId).modal({backdrop: "static"});
    };
    $scope.openBettingInterface = openBettingInterface;

    /**
     * @ngdoc function
     * @name resetGame
     * @description
     * # resetGame
     * Function that navigates the app to the gameSetup page.
     */
    function resetGame(){
      $location.path( '/gameSetup' );
    };
    $scope.resetGame = resetGame;

    /**
     * @ngdoc function
     * @name calcTotalBet
     * @description
     * # calcTotalBet
     * Function that calculates the total bet amount.
     */
    function calcTotalBet(){
      let totalBet = 0;
      _.each($scope.truckerBets, function(truckerBet) {
        totalBet += truckerBet.bet;
      });
      $scope.totalBet = isNaN(totalBet) ? 0 : totalBet;
    }

    $scope.calcTotalBet = calcTotalBet;

    /**
     * @ngdoc function
     * @name generateRandom
     * @description
     * # generateRandom
     * Function that generates random numbers with a range passed as parameter.
     */
    function generateRandom(multiplier){
      return Math.floor(Math.random()*multiplier);
    };

    $scope.random = generateRandom;

    /**
     * @ngdoc function
     * @name clearBets
     * @description
     * # clearBets
     * Function that clears all the bets.
     */
    function clearBets(){
      _.each($scope.truckerBets, function(truckerBet) {
        truckerBet.bet = 0;
      });
    };

    $scope.clearBets = clearBets;

  }]);
