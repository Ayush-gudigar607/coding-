interface Calculator{
    add(a:number,b:number):number;
}

let calc:Calculator={
    add(a,b){
        return a+b;
    }
}