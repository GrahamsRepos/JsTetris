let width = 10;
let height = 20;
let noElements = width*height;
let array = [];

for(let i=0;i<noElements;i++){
    array.push(0)
}

let row = 0;
const printArray = ()=>{
    let i = 0;
    let currRow = 0;
    while(i<noElements){
        let string = '';
        for(let ii = 0;ii<width;ii++){
            if(currRow !== row) {
                string += array[i + ii].toString()+' ';
            }else{
                string += 1 +' ';
            }
        }
        console.log(string);
        i+=width;
        currRow+=1;
    }
}

setInterval(()=>{
    console.clear()
    printArray()
    if(row===height-1){
        row=0
    }else {
        row += 1;
    }
},1000)

