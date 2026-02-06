class Animal{
    sound()
    {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal{
    sound()
    {
        console.log("Dog barks");
    }
}
let a:Animal=new Animal();
a.sound();

let d:Animal=new Dog();
d.sound();