type Admin={
    name:string;
    role:string;
}

type User={
    name:string;
    email:string
}

function printPerson(person:Admin | User)
{
    if("role" in person)
    {
        return `Role is ${person.role}`
    }
    else{
        return `Role is ${person.email}`
    }
}

console.log(printPerson({name:"Ayush",role:"admin"}))