function printUserInfo(name:string,age:number,ph?:number){
    return `name is ${name},age is ${age}, phone is ${ph? ph:"not provided"}`;
}
console.log(printUserInfo("Ayush",20));
console.log(printUserInfo("Rohan",22,7842136965));