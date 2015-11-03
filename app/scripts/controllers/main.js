'use strict';
/**
 * @ngdoc function
 * @name minesweeperAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the minesweeperAngularApp
 */
angular.module('minesweeperAngularApp').controller('MainCtrl', ['$scope', function($scope) {
    function createMinefield() {
        var minefield = {};
        minefield.rows = [];
        for (var i = 0; i < 9; i++) {
            var row = {};
            row.spots = [];
            for (var j = 0; j < 9; j++) {
                var spot = {};
                spot.isCovered = true;
                spot.content = "empty";
                row.spots.push(spot);
            }
            minefield.rows.push(row);
        }
        placeManyRandomMines(minefield);
        calculateAllNumbers(minefield);
        return minefield;
    }

    function getSpot(minefield, row, column) {
        return minefield.rows[row].spots[column];
    }

    function placeRandomMine(minefield) {
        var row = Math.round(Math.random() * 8);
        var column = Math.round(Math.random() * 8);
        var spot = getSpot(minefield, row, column);
        spot.content = "mine";
        // console.info(row + ", " + column); //test
    }

    function placeManyRandomMines(minefield) {
        for (var i = 0; i < 10; i++) {
            placeRandomMine(minefield);
        }
    }

    function calculateNumber(minefield, row, column) {
        var thisSpot = getSpot(minefield, row, column);
        // if this spot contains a mine then we can't place a number here
        if (thisSpot.content == "mine") {
            return;
        }
        var mineCount = 0;
        // check row above if this is not the first row
        if (row > 0) {
            // check column to the left if this is not the first column
            if (column > 0) {
                // get the spot above and to the left
                var spot = getSpot(minefield, row - 1, column - 1);
                if (spot.content == "mine") {
                    mineCount++;
                }
            }
            // get the spot right above
            var spot = getSpot(minefield, row - 1, column);
            if (spot.content == "mine") {
                mineCount++;
            }
            // check column to the right if this is not the last column
            if (column < 8) {
                // get the spot above and to the right
                var spot = getSpot(minefield, row - 1, column + 1);
                if (spot.content == "mine") {
                    mineCount++;
                }
            }
        }
        // check column to the left if this is not the first column
        if (column > 0) {
            // get the spot to the left
            var spot = getSpot(minefield, row, column - 1);
            if (spot.content == "mine") {
                mineCount++;
            }
        }
        // check column to the right if this is not the last column
        if (column < 8) {
            // get the spot to the right
            var spot = getSpot(minefield, row, column + 1);
            if (spot.content == "mine") {
                mineCount++;
            }
        }
        // check row below if this is not the last row
        if (row < 8) {
            // check column to the left if this is not the first column
            if (column > 0) {
                // get the spot below and to the left
                var spot = getSpot(minefield, row + 1, column - 1);
                if (spot.content == "mine") {
                    mineCount++;
                }
            }
            // get the spot right below
            var spot = getSpot(minefield, row + 1, column);
            if (spot.content == "mine") {
                mineCount++;
            }
            // check column to the right if this is not the last column
            if (column < 8) {
                // get the spot below and to the right
                var spot = getSpot(minefield, row + 1, column + 1);
                if (spot.content == "mine") {
                    mineCount++;
                }
            }
        }
        if (mineCount > 0) {
            thisSpot.content = mineCount;
            // if (mineCount == 2) console.info("mineCount is " + mineCount + " for -->" + row + ", " + column); //test
        }
    }

    function calculateAllNumbers(minefield) {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                calculateNumber(minefield, x, y);
            }
        }
    }

    function hasWon(minefield) {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var spot = getSpot(minefield, y, x);
                if (spot.isCovered && spot.content != "mine") {
                    return false;
                }
            }
        }
        return true;
    }

    function hasLost(minefield) {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var spot = getSpot(minefield, y, x);
                if (!spot.isCovered && spot.content == "mine") {
                    return true;
                }
            }
        }
        return false;
    }
    $scope.uncoverSpot = function(spot) {
        spot.isCovered = false;
        // $scope.isLoseMessageVisible = false; //test
        if (hasWon($scope.minefield) && !hasLost($scope.minefield)) {
            $scope.isWinMessageVisible = true;
        } else if (hasLost($scope.minefield)) {
            $scope.isLoseMessageVisible = true;
            // spot.isCovered = true; //test and also cheat to win game everytime :)
        }
    };
    $scope.minefield = createMinefield();
}]);