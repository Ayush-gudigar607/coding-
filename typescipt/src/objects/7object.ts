interface calculator{
    add(a:number,b:number):number;
}

const calc:calculator={
    add(a,b)
    {
        return a+b
    }
}
console.log(calc.add(5,10));