"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', function () {
    var score = 0;
    var width = 10;
    var height = 20;
    var grid = document.querySelector('.grid');
    var squares = Array.from(document.querySelectorAll('.grid div')); //Convert nodelist to array in order to use methods such as push pop etc.
    var scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = score.toString(10);
    var startButton = document.getElementById("start-button");
    //Tetrominos
    var lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, 2 * width, 2 * width + 1],
        [width, 2 * width, 2 * width + 1, 2 * width + 2]
    ];
    var zTetromino = [
        [width, width + 1, 2 * width + 1, 2 * width + 2],
        [0, width, width + 1, 2 * width + 1],
        [width + 1, width + 2, 2 * width, 2 * width + 1],
        [0, width, width + 1, 2 * width + 1]
    ];
    var tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, 2 * width + 1],
        [width, width + 1, width + 2, 2 * width + 1],
        [1, width, width + 1, 2 * width + 1]
    ];
    var oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];
    var iTetromino = [
        [1, width + 1, 2 * width + 1, 3 * width + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];
    var tetrominoesREF = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];
    var currentPosition = Math.abs(Math.floor(Math.random() * width - 4));
    var currentTetromino = tetrominoesREF[Math.floor(Math.random() * tetrominoesREF.length)][0];
    var currentColor = 'blue';
    var randomSelectTetromino = function () {
        currentTetromino = tetrominoesREF[Math.floor(Math.random() * tetrominoesREF.length)][0];
    };
    var draw = function () {
        //Checks if the tetromino overlaps with other tetrominos -- Create new tetramino and reset the position if it does
        if (checkOverlap()) {
            currentTetromino.forEach(function (index, idx) {
                squares[index + currentPosition - width].classList.add('tetromino');
                squares[index + currentPosition - width].style.backgroundColor = currentColor;
            });
            currentPosition = Math.abs(Math.floor(Math.random() * width - 4));
            setRandomColor();
            randomSelectTetromino();
        }
        //Draw the new position
        else {
            currentTetromino.forEach(function (index, idx) {
                squares[index + currentPosition].classList.add('tetromino');
                squares[index + currentPosition].style.backgroundColor = currentColor;
            });
        }
    };
    //used to undraw the teramino before drawing the new position
    var undraw = function () {
        currentTetromino.forEach(function (index) {
            squares[currentPosition + index].classList.remove('tetromino');
            squares[index + currentPosition].style.backgroundColor = '';
        });
    };
    var setRandomColor = function () {
        var colors = ['red', 'blue', 'green', 'orange', 'purple'];
        currentColor = colors[Math.floor(Math.random() * colors.length)];
    };
    var checkOverlap = function () {
        var hasOverlap = false;
        currentTetromino.forEach(function (index, idx) {
            hasOverlap = typeof squares[index + currentPosition].classList.contains('tetromino') !== 'undefined' && squares[index + currentPosition].classList.contains('tetromino') && hasOverlap === false ? true : hasOverlap;
        });
        return hasOverlap;
    };
    //Make the tetromino move down every second
    var moveDown = function () {
        if (typeof squares[currentPosition + Math.max.apply(Math, currentTetromino) + width] !== 'undefined' || !checkOverlap()) {
            undraw();
            currentPosition += width;
            draw();
        }
        else {
            setRandomColor();
            currentPosition = Math.abs(Math.floor(Math.random() * width - 4));
            randomSelectTetromino();
        }
    };
    //let timerID = setInterval(moveDown,200);
    var started = false;
    var timerId;
    startButton.addEventListener('click', function () {
        if (!started) {
            started = true;
            timerId = setInterval(moveDown, 200);
        }
        else {
            clearInterval(timerId);
            started = false;
        }
    });
});
