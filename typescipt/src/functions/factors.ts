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

console.log(getFactors(12));