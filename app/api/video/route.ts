import { authOptions } from "@/lib/auth";
import { ConnectToDbs } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function  GET() {
    try {
       const session=await getServerSession(authOptions)

       if(!session){
        return NextResponse.json({error:'Unauthorized acess login to acess'},{status:500})

       }
         await ConnectToDbs()

       const videos= await Video.find({}).sort({createdAt:-1}).lean()   //passes an array of all the videos and .lean() helps in removing unnescary methods like save and all while just displaying the video

       if(!videos ||  videos.length ===0 ){
        return NextResponse.json([],{status:200})
       }
       
       return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error:'failed to fetch videos'},{status:500})

    }
    
}

export async function POST(request:NextRequest){
    try {
       const session=await getServerSession(authOptions)

       if(!session){
        return NextResponse.json({error:'Unauthorized acess login to acess'},{status:400})

       }
       await ConnectToDbs()

      const body :IVideo=await request.json()
         if (
      !body.title ||
      !body.Description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
          const videoData={
            ...body,
            controls:body?.controls||true,
            transformation:{
                height:1920,
             width:1080,
        quality:body.transformation?.quality??100,
            }
          }
    const newVideo= await Video.create(videoData)
          return NextResponse.json(newVideo)
  } 
  catch(error){
    return NextResponse.json(
        { error: "Failed to create video" },
        { status: 500 }
      );
  }
}
