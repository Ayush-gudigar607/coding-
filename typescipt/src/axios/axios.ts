interface User{
    id:number;
    name:string;
    email:string;
}

axios.get<User[]>('https://jsonplaceholder.typicode.com/users').then(responce=>{
    responce.data.forEach(user=>{
        console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    })
})

async function fetchUsers() {
  const response = await axios.get<User[]>("https://api.example.com/users");
  return response.data;
}

interface CreateUser{
    name:string;
    email:string;
}

axios.post<User>('https://jsonplaceholder.typicode.com/users',{
    name:"New User",
    email:"ayus@gmail.com"
}).then(responce=>{
    console.log(`Created User - ID: ${responce.data.id}, Name: ${responce.data.name}, Email: ${responce.data.email}`);
})

try {
    await axios.get("https://jsonplaceholder.typicode.com/invalid-endpoint");
} catch (error) {
    if(axios.isAxiosError(error)) {
        console.log(`Axios Error: ${error.message}`);
    }
}

interface ApiResponse<T>{
    data:T;
    success:boolean;
}
const res=await axios.get<ApiResponce<User[]>>('https://jsonplaceholder.typicode.com/users');
if(res.data.success){
    res.data.data.forEach(user=>{
        console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    })
}