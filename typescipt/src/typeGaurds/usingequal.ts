function check(x:string |null)
{
    if(x!=null)
    {
        console.log(x.toUpperCase())
        return `String length is ${x.length}`
        
    }
}

console.log(check("Ayush"))