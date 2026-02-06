type Student={
id:number;
name:string;
age:number;
}

let students:Student[]=[
    {id:1,name:"Ayush",age:20},
    {id:2,name:"Rohan",age:22},
    {id:3,name:"Sohan",age:21}
]
students.forEach((student)=>{
    console.log(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}`);
});