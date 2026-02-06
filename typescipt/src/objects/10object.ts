type results={
    status:"pass";
    marks:number;
} |
{
    status:"fail";
    marks:number;
}

function printresult(res:results){
    if(res.status==="pass"){
        return `Congratulations! You have passed with marks ${res.marks}`;
    }
    else
    {
        return `Unfortunately, you have failed with marks ${res.marks}`;
    }
}

console.log(printresult({status:"pass",marks:85}));
console.log(printresult({status:"fail",marks:40}));
