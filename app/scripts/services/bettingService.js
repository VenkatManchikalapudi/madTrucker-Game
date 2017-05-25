'use strict';

/**
 * @ngdoc function
 * @name madTruckerApp.Service:bettingService
 * @description
 * # bettingService
 * Service of the madTruckerApp
 */

angular.module('madTruckerApp')
  .service('bettingService', function () {
    this.playerName = 'Guest';
    this.initialFunds = 1000;
    this.playerAccountBalance = 1000;
    this.truckerBets = [];
    this.numberOfTruckers = 4;

  });
