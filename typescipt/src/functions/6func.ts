function printId(id:number |string){
    if(typeof id==="number")
    {
        return `ID is Number: ${id}`;
    }
    else
    {
        return `ID is string:${id}`
    }
}
console.log(printId(101));
console.log(printId("A101"));