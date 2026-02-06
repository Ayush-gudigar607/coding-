function processData(value:number,callback:(n:number)=>number){
    return callback(value);
}
console.log(processData(5,(n)=>n*n));