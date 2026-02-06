interface customers{
    name:string;
    //optional property
    phone?:string
}
let customers1:customers={name:"Ajay"};
let customers2:customers={name:"Vijay",phone:"1234567890"};

console.log(customers1);
console.log(customers2);