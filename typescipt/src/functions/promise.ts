function getFactors(n:number):number[]
{
    const factors:number[]=[];
for(let i=0;i<=n;i++)
{
    if(n%i==0)
    {
        factors.push(i);
    }
}
return factors;
}

async function getFactorsAsync(n:number):Promise <number[]>{
return new Promise((resolve)=>
{
    setTimeout(()=>{
        resolve(getFactors(n));
    }, 10000);
})
}

getFactorsAsync(15).then(factors=>console.log(factors));