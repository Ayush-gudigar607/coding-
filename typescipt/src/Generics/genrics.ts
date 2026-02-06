function identity<T>(value:T):T{
    return value;
}

let out1=identity<string>("Hello Generics");
console.log(out1);

let out2=identity<number>(42);
console.log(out2);
