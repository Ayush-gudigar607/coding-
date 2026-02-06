interface Person{
    name:string;
}

interface employee extends Person{
    empId:number;
}

let emp:employee={
    name:"Ayush",
    empId:101
}

console.log(`Name: ${emp.name}, Employee ID: ${emp.empId}`);