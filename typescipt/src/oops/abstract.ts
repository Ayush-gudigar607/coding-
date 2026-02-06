abstract class Shape {
    abstract area():number;
}

class Circle extends Shape {
     private radius: number; 
    constructor(radius: number){
        super();
        this.radius = radius;
    }
    area(){
        return Math.PI * this.radius * this.radius;
    }
}

let circle=new Circle(10);
console.log(`Area of Circle: ${circle.area()}`);        