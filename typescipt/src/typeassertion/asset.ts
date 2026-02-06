

type Book={
    name:string
}

let bookString={"name":"TypeScript Basics"};
let bookobject=bookString as Book;
console.log(bookobject.name);

try {
    
} catch (error) {
    if(error instanceof Error)
    {
console.log(error.message);
    }
}

const data:unknown="hyy i am 1 st string "
const dupString:string=data as string;
console.log(dupString);

type Role="Admin" | "User";

function RedirecttoRole(role:Role):void{
    if (role==="Admin")
    {
        console.log("Redirect to Admin Dashboard");
    }
    if(role==="User")
    {
        console.log("Redirect to User Dashboard");
    }
    role
}