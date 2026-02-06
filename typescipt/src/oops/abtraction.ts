interface payment{
    pay(amount:number):void;
}

class cardPayment implements payment {
    pay(amount:number){
        console.log(`Paid ${amount} using Card`);
    }
}

class cashPayment implements payment {
    pay(amount:number){
        console.log(`Paid ${amount} using Cash`);
    }
}

class upiPayment implements payment {
    pay(amount:number){
        console.log(`Paid ${amount} using UPI`);
        
    }
}
 
const mycash=new cashPayment();
mycash.pay(500);
console.log(mycash instanceof cashPayment);

