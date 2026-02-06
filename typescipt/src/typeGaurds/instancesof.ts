// class cardPayment{
//     payByCard()
//     {
//         console.log("paid by card");
//     }
// }

// class upiPayment{
//     payByUpi()
//     {
//         console.log("paid by UPI");
//     }
// }

// class cashpayment{
//     payByCash()
//     {
//         console.log("paid by cash");
//     }
// }



// function makePayment(payment:cardPayment  | upiPayment | cashpayment)
// {
//     if(payment instanceof cardPayment)
//     {
//         payment.payByCard()
//     }
//     else if (payment instanceof upiPayment)
//     {
//         payment.payByUpi()
//     }
//     else{
//         payment.payByCash()
//     }
// }

// makePayment(new upiPayment())

type cardPayment={
    kind:"card";
    payByCard():void;
}

type upiPayment={
    kind:"upi";
    paymentByUpi():void;
}
type cashPayment={

    kind:"cash";
    payByCash():void;
}

function makePayment(payment:cardPayment |upiPayment | cashPayment){
    switch(payment.kind)
    {
        case "card":
            payment.payByCard();
            break;

        case "upi":
            payment.paymentByUpi();
            break;
            
        case "cash":
            payment.payByCash();
            break;    
    }
}

makePayment({ kind:"card",payByCard:()=>{console.log("paid by card")} })