interface Address{
    city:string;
    country:string;
}

interface Person{
    name:string;
    address:Address;
}

let person:Person={
    name:"John",
    address:{
        city:"New York",
        country:"USA"
    }
}
console.log(person);