interface Flyable{
    fly():void;
}

class Bird implements Flyable{
    fly(){
        console.log("Bird is flying");
    }
}

const sparrow=new Bird();
sparrow.fly();