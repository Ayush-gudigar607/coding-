class Box<T>{
    content:T;
    constructor(value:T)
    {
        this.content=value;
    }
}
let box1=new Box<string>("Hello TypeScript");
let box2=new Box<number>(12345);
console.log(`Box1 Content: ${box1.content}`);
console.log(`Box2 Content: ${box2.content}`);