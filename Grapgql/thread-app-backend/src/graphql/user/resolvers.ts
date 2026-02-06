import type { CreateUserPayload } from "../../services/user"
import UserService from "../../services/user"


const queries={
    getUserToken:async(_:any,payload:{email:string,password:string})=>{
        const token=await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        })
        return token;
    },
    getCurrentLoggedInUser:async(_:any,parameter:any,context:any)=>{
          if(context && context.user)
        {
                const user=await UserService.getUserById(context.user.id);
                return user;
        }
        throw new Error("Unauthorized");
      }
}

const mutations={
    createUser:async(_:any,payload:CreateUserPayload)=>{
        const res=await UserService.createUser(payload)
        if(!res.id && res.email && res.firstName && res.password) throw new Error("Failed to create user")
            return res.id;
        
    }
}

export const resolvers={queries,mutations}