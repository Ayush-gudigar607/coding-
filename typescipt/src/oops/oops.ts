//class and object Example in TypeScript

class student{
    name:string;
    rollNo:number;
 
    constructor(name:string, rollNo:number){
        this.name=name;
        this.rollNo=rollNo
}

displayInfo()
{
    console.log(`Name: ${this.name}, Roll No: ${this.rollNo}`);
}
}

let stud1=new student("Ayush",101);
stud1.displayInfo();

let stud2=new student("Rohan",102);
stud2.displayInfo();