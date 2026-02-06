enum paymentstatus{
pending,
completed,
failed
}

function checkpaymentStatus(status:paymentstatus){
    if(status===paymentstatus.completed)
    {
        console.log("Payment Completed");
    }
}

checkpaymentStatus(paymentstatus.completed);