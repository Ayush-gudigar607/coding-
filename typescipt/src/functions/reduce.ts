function sum(...numbers:number[]):number{
    return numbers.reduce((acc,red)=>acc+red,0);
}
console.log(sum(1,2,3,4,5));
console.log(sum(10,20,30));