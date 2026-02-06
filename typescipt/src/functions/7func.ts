function createUser(name:string,age:number)
{
    return {
        name,
        age,
        isActive:true
    }
}
const parseobj=JSON.stringify(createUser("Rohan",22));
console.log(JSON.parse(parseobj));
