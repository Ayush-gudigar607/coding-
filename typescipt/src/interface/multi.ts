interface Operations{
    (a:number,b:number):number;
}

let multiply:Operations=(x,y)=>x*y;
console.log(`Multiplication: ${multiply(5,6)}`);

let divide:Operations=(x,y)=>x/y;
console.log(`Division: ${divide(30,5)}`);