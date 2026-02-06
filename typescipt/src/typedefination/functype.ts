type Addfn={
    (a:number,b:number):number;
}


const add:Addfn=(x,y)=>x+y;
console.log(`Addition: ${add(10,20)}`);