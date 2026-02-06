class person{
    name:string;

    constructor(name:string){
        this.name=name;
    }
}

class employee extends person{
    empId:number;

    constructor(name:string,empId:number){
        super(name);
        this.empId=empId;
    }
}

let emp=new employee("Ayush",101);
console.log(`Name: ${emp.name}, Employee ID: ${emp.empId}`);