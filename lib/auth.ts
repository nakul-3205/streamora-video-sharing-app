import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDbs } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";



export const authOptions:NextAuthOptions={
    
      providers: [
        CredentialsProvider({
         name:'Credentials',
         credentials:{
            email:{label:"Email",type:"text"},
            password:{label:'Password',type:'password'}
        },
        async authorize(credentials) {
            if(!credentials?.email||!credentials?.password){
                throw new Error("Missing email or password")
            }
            try {
                await ConnectToDbs()
               const user= await User.findOne({email:credentials.email})
               if(!user){
                 throw new Error("User not found 404")

               }
              const verifiedpass= await bcrypt.compare(
                credentials.password,
                user.password
              )
              if(!verifiedpass){
                 throw new Error("Wrong password")

              }
              return {
                id:user._id.toString(),
                email:user.email
              }
            } catch (error) {
                throw error
                console.log(error)
            }
        },
        
})],

   callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id

        }
        return token
    },
    async session({token,session}){
        if(session.user){
            session.user.id=token.id as string

        }
        return session
    },
    
   },
   pages:{
    signIn:'/login',
    error:'/login'
   },
   session:{
    strategy:'jwt',
    maxAge:30*24*60*60
   },
   secret:process.env.NEXTAUTH_SECRET,
   
}