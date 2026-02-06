import { prismaClients } from "../lib/db"
import {createHmac,randomBytes} from 'node:crypto'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export interface CreateUserPayload{
    firstName:string
    lastName?:string
    email:string
    password:string

}
export interface getUserTokenPayload{
    email:string
    password:string
}

class UserService {

    private static generateHash(salt:string,password:string)
    {
         const hashedPassword=createHmac('sha256',salt).update(password).digest('hex');
         return hashedPassword
    }


    public static async createUser(payload:CreateUserPayload){
        const {firstName, lastName = '', email, password}=payload
        const salt=randomBytes(16).toString('hex');
        const hashedPassword=UserService.generateHash(salt,password);

        return await prismaClients.user.create({
            data: {
                firstName,
                lastName,
                email,
                password:hashedPassword,
                profileImageURL: '',
                salt:salt
            }
        })
    }

    private static getUserByEmail(email:string)
    {
        return prismaClients.user.findUnique({where:{email}})
    }

    public static getUserById(id:string)
    {
        return prismaClients.user.findUnique({where:{id}})
    }

    

    public static async getUserToken(payload:getUserTokenPayload)
    {
        const {email,password}=payload
        const user= await UserService.getUserByEmail(email);
        if(!user) throw new Error("User not found");
        const usersalt=user.salt;
        const hashedPassword=UserService.generateHash(usersalt,password);

        if(hashedPassword!==user.password) throw new Error("Invalid credentials");

        //Get a token  using jwt

        const token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET_KEY as string,{expiresIn:'1h'})
        return token;

        
    }
    public static decodeJWTToken(token:string)
    {
        return jwt.verify(token,process.env.JWT_SECRET_KEY as string);
    }

}

export default UserService