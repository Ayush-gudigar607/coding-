function printtId(id:number |string)
{
    if(typeof id ==="number")
    {
        return `${id} is Number`
     }
    else
    {
    return `${id} is String`
    }
}
console.log(printtId(123))
console.log(printtId("abc"))