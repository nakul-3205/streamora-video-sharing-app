import { NextRequest,NextResponse } from "next/server";
import User from "@/models/User";
import { ConnectToDbs } from "@/lib/db";

export async function POST(request:NextRequest){
    try {
       const {email,password} = await request.json()
       if(!email || !password){
        return NextResponse.json({error:'Email and password are required'},{status:400})
       }
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         const isValid = emailRegex.test(email);

          if (!isValid) {
             return NextResponse.json({error:'Enter a valid email'},{status:400})
           }
           await ConnectToDbs()
           const existingUser=await User.findOne({email})

           if(existingUser){
            return NextResponse.json({error:'User already exists'},{status:400})

           }
           await User.create({
            email,
            password,
           })
           return NextResponse.json({
            message:'User registered Sucesfully'
           },{
            status:200
           })


    } catch (error) {
          return NextResponse.json({error:'Failed to register user'},{status:500})

    }
}