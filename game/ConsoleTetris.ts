import {tetromino} from "./types";

let symbol:string = '\u2584' //The blocks that make up the teromino
let whitespacesymbol:string = '.'
let speed:number = 300;
let score:number = 0;
    const width:number = 10;
    const height = 20;





    //Tetrominos
    const lTetromino:tetromino = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,2*width,2*width+1],
        [width,2*width,2*width+1,2*width+2]
    ];
    const lmirrTetromino:tetromino =[
        [1, width+1,2*width+1,2*width+2],
        [width,width+1,width+2,2*width],
        [0,1,width+1,2*width+1],
        [2,width,width+1,width+2]

    ]
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

    let orientation = 0
    const tetrominoesREF:tetromino[] = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino,lmirrTetromino]
     let currentPosition:number = 0 //Math.abs(Math.floor(Math.random()*width-4));
    let shift = currentPosition;
    let tetrominoIndex:number =Math.floor(Math.random() * tetrominoesREF.length);
    let currentTetromino =tetrominoesREF[tetrominoIndex][orientation]
    let currentColor="\x1b[31m";

    //--------------------------------------
    //Console Tetris
    //---------------------------------------
    let noElements = width*height;
    let array:string[] = [];
    for(let i=0;i<noElements;i++){
        array.push(whitespacesymbol)
    }
    const printArray = ()=>{
        console.log('\n');
        let i = 0;
        let currRow = 0;
        while(i<noElements-1){
            let string = '';
            for(let ii = 0;ii<width;ii++){
                if(ii < width -1) {
                    string += array[i + ii].toString() + ' ';
                }else{
                    string += array[i + ii].toString();
                }
            }
            console.log('|'+string+'|');
            i+=width;
            currRow+=1;
        }
        //getMostRightPosition()
       // checkOverlapVertical();
    }

    const randomSelectTetromino = ()=>{
        shift=currentPosition;
        tetrominoIndex = Math.floor(Math.random() * tetrominoesREF.length)
        currentTetromino = tetrominoesREF[tetrominoIndex][orientation]
        setRandomColor();
    }


    const draw =()=>{
        //Checks if the tetromino overlaps with other tetrominos -- Create new tetramino and reset the position if it does
            currentTetromino.forEach((index, idx) => {
                array[index + currentPosition]=`${currentColor}${symbol}\x1b[0m`;
                console.clear()
                printArray()
            });
            // currentPosition=Math.abs(Math.floor(Math.random()*width-4));
            // setRandomColor();
            // randomSelectTetromino();
        //Draw the new position;
    };

    //used to undraw the teramino before drawing the new position
    const undraw =()=>{
        currentTetromino.forEach(index=>{
            array[index + currentPosition]=whitespacesymbol;
            console.clear()
            printArray()
        });
    };

    const setRandomColor = ()=>{
        const colors:string[] = ["\x1b[31m",'\x1b[34m','\x1b[32m','\x1b[36m'];
        currentColor =  colors[Math.floor(Math.random()*colors.length)];
    }



    //--------------------------------------------------------------------------------------------------------------------
    // Functions that are used to determine if the teromino can move , rotate , shift to it's next position or orientation
    // --------------------------------------------------------------------------------------------------------------------
    const checkOverlapVertical = ()=>{
        let hasOverlap = false;
        let currentTerominoMap = currentTetromino.map(index=>(index+currentPosition))
        currentTetromino.forEach((index,idx)=>{
            hasOverlap = !currentTerominoMap.includes(index+currentPosition+width) &&(typeof array[index + currentPosition+width]=== 'undefined' ||array[index + currentPosition+width].toString().includes(symbol))?true:hasOverlap;
        });
        return hasOverlap;
    }
    const getMaxIndex = ()=>{
        return Math.max(...currentTetromino)+currentPosition+width
    }

    let checkCanRotateRight = ()=>{
        let checkZeroModulo = (element:number)=>element%width===0
         return !tetrominoesREF[tetrominoIndex][orientation<3?orientation+=1:0].map(position=>(position+currentPosition)).some(checkZeroModulo);
    }

    let checkCanRotatLeft = ()=>{
        let checkZeroModulo = (element:number)=>element%width===0
        return !tetrominoesREF[tetrominoIndex][orientation>0?orientation-1:3].map(position=>(position+currentPosition)).some(checkZeroModulo);
    }

    let canMoveRight =()=>{
        let hasOverlap = false;
        let currentTerominoMap = currentTetromino.map(index=>(index+currentPosition))
        currentTetromino.forEach((index,idx)=>{
            hasOverlap = !currentTerominoMap.includes(index+currentPosition+1) &&(typeof array[index + currentPosition+1]=== 'undefined' ||array[index + currentPosition+1].toString().includes(symbol))?true:hasOverlap;
        });
        return !hasOverlap;
    }

    let canMoveLeft =() =>{
        let hasOverlap = false;
        let currentTerominoMap = currentTetromino.map(index=>(index+currentPosition))
        currentTetromino.forEach((index,idx)=>{
            hasOverlap = !currentTerominoMap.includes(index+currentPosition-1) &&(typeof array[index + currentPosition-1]=== 'undefined' ||array[index + currentPosition-1].toString().includes(symbol))?true:hasOverlap;
        });
        return !hasOverlap;
    }

    let hasVerticalFill =()=>{
        let hasVerticalFill = false;
        for(let i =0 ; i<width;i++){
            if(array[i].toString().includes(symbol)){
                hasVerticalFill = true;
                break;
            }
        }
        return hasVerticalFill;
    }




   //Used to shift the teromino down
    let moveDown = async()=>{
        let overlap = checkOverlapVertical();
        if(getMaxIndex() < height*width && !checkOverlapVertical()) {
                undraw();
                currentPosition += width;
                draw();
                if(hasVerticalFill()){
                    clearInterval(timerID);
                }
            }
        else{
            currentPosition = Math.abs(Math.floor(Math.random()*width-4));
            randomSelectTetromino();
            undraw()
            draw();


        }


    }

let timerID = setInterval(moveDown,speed);
let started = true;

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
//
// process.stdin.on('keypress', (str, key) => {
//     if (key.ctrl && key.name === 'c') {
//         process.exit();
//     } else {
//
//         if(key.name==="down")
//             console.log("Blah")
//             orientation+=1;
//         }
// });


    // let timerId:NodeJS.Timeout;
    // if(!started){
    //         started = true;
    //         timerId = setInterval(()=>{
    //             moveDown();
    //         },200);
    // }else{
    //         // @ts-ignore
    //     clearInterval(timerId);
    //         started =false;
    // }





//Gets the current tetromino square closest to the right
const getMostRightPosition = ()=>{
    let maxIndex = 0;
    let maxModulo = 0;
    currentTetromino.forEach((position,index)=>{
        if((position + currentPosition)%(width)>maxModulo){
            maxModulo =(position +currentPosition)%(width);
            maxIndex = position + currentPosition
        }
    })
    console.log(maxModulo);
    console.log(maxIndex);
    return maxModulo;
    // console.log(width+maxIndex);
}

const getMostLeftPosition =()=>{
    let minIndex = 0;
    let minModulo = 9;
    currentTetromino.forEach((position,index)=>{
        if((position + currentPosition)%(width)<minModulo){
            minModulo =(position +currentPosition)%(width);
            minIndex = position + currentPosition
        }
    })
    console.log(minModulo);
    console.log(minIndex);
    return minModulo;
    // console.log(width+maxIndex);
}

// make `process.stdin` begin emitting "keypress" events



let keypress = require('keypress');
keypress(process.stdin);
let currentkey = ''
//listen for key press events
process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        console.clear();
        process.stdin.pause();
        process.exit();
    }else if(key.name==='up') {
        currentkey=key.name;
        if(checkCanRotateRight()) {
            undraw()
            if (orientation < 3) {
                orientation += 1;
            } else {
                orientation = 0;
            }
            currentTetromino = tetrominoesREF[tetrominoIndex][orientation]
            draw()
        }
    }else if(key.name==='down'){
        if(checkCanRotatLeft()) {
            undraw()
            if (orientation > 0) {
                orientation = orientation - 1;
            } else {
                orientation = 3;
            }
            currentTetromino = tetrominoesREF[tetrominoIndex][orientation]
            draw();
        }
    }else if(key.name==='right'){
        if( getMostRightPosition()<width-1 && canMoveRight() ){
            undraw();
            currentPosition+=1;
            draw();

        }
    }else if(key.name==='left'){
        if(getMostLeftPosition()>0 && canMoveLeft()){
            undraw()
            currentPosition-=1;
            draw();

        }
    }else if(key.name="p"){
        if(started){
            clearInterval(timerID);
            started = false;
        }else{
            timerID = setInterval(moveDown,speed);
            started = true;
        }
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();









