interface Result<T> {
  success: boolean;
  data: T;
}

function successresponce<T>(data:T):Result<T>{
    return {
        success:true,
        data:data
    }
}

const responce1=successresponce<string>("Data loaded successfully");
console.log(responce1);