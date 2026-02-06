function discount(price:number,rate:number=10):number{
    return price - (price*rate/100);
}
console.log(`----- Discounted Prices -----`);
console.log(`\t${discount(1000)}`);
console.log(`\t${discount(1000,20)}`);