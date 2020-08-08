import {tetromino} from "./types";

document.addEventListener('DOMContentLoaded',()=>{
    let score:number = 0;
    const width:number = 10;
    const height = 20;
    const grid = <HTMLDivElement>document.querySelector('.grid');
    let squares =  <HTMLDivElement[]>Array.from(document.querySelectorAll('.grid div')); //Convert nodelist to array in order to use methods such as push pop etc.
    const scoreDisplay = <HTMLSpanElement>document.getElementById('score');
    scoreDisplay.innerText = score.toString(10);
    const startButton = <HTMLButtonElement>document.getElementById("start-button")

    //Tetrominos
    const lTetromino:tetromino = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,2*width,2*width+1],
        [width,2*width,2*width+1,2*width+2]
    ];
    const zTetromino:tetromino =[
        [width,width+1,2*width+1,2*width+2],
        [0,width,width+1,2*width+1],
        [width+1,width+2,2*width,2*width+1],
        [0,width,width+1,2*width+1]
    ];
    const tTetromino:tetromino =[
        [1,width,width+1,width+2],
        [1,width+1,width+2,2*width+1],
        [width,width+1,width+2,2*width+1],
        [1,width,width+1,2*width+1]
    ];
    const oTetromino:tetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ];
    const iTetromino:tetromino =[
        [1,width+1,2*width+1,3*width+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const tetrominoesREF:tetromino[] = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]
    let currentPosition:number = Math.abs(Math.floor(Math.random()*width-4));
    let currentTetromino =tetrominoesREF[Math.floor(Math.random() * tetrominoesREF.length)][0]
    let currentColor='blue';


    const randomSelectTetromino = ()=>{
        currentTetromino = tetrominoesREF[Math.floor(Math.random() * tetrominoesREF.length)][0]
    }


    const draw =()=>{
        //Checks if the tetromino overlaps with other tetrominos
        if(checkOverlap()){
            currentTetromino.forEach((index, idx) => {
                console.log()
                squares[index + currentPosition-width].classList.add('tetromino')
                squares[index + currentPosition-width].style.backgroundColor = currentColor;

            });
            currentPosition=Math.abs(Math.floor(Math.random()*width-4));
            setRandomColor();
            randomSelectTetromino();

        }else {
            currentTetromino.forEach((index, idx) => {
                console.log()
                squares[index + currentPosition].classList.add('tetromino');
                squares[index + currentPosition].style.backgroundColor = currentColor;
            });
        }
    };

    const undraw =()=>{
        currentTetromino.forEach(index=>{
            squares[currentPosition+index].classList.remove('tetromino');
            squares[index + currentPosition].style.backgroundColor = '';
        });
    };

    const setRandomColor = ()=>{
        const colors:string[] = ['red','blue','green','orange','purple']
        currentColor =  colors[Math.floor(Math.random()*colors.length)]
        console.log(currentColor);
    }

    const checkOverlap = ()=>{
        let hasOverlap = false;
        currentTetromino.forEach((index,idx)=>{
            hasOverlap = typeof squares[index+currentPosition].classList.contains('tetromino') !== 'undefined' && squares[index+currentPosition].classList.contains('tetromino')  && hasOverlap === false?true:hasOverlap;
        });
        return hasOverlap;
    }




    //Make the tetromino move down every second



    let moveDown = ()=>{
        if( typeof squares[currentPosition+Math.max(...currentTetromino)+width] !== 'undefined' || !checkOverlap()) {
            undraw();
            currentPosition += width;
            draw();
        }
        else{
            setRandomColor();
            currentPosition= Math.abs(Math.floor(Math.random()*width-4));
            randomSelectTetromino();
        }

    }

    //let timerID = setInterval(moveDown,200);
    let started = false;
    let timerId:number;
    startButton.addEventListener('click',()=>{

        if(!started){
            started = true;
            timerId = setInterval(moveDown,200);
        }else{
            clearInterval(timerId);
            started =false;
        }
    })









})