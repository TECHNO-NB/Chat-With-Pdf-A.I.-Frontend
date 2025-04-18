import { NextResponse } from "next/server";




export async function POST(request:Request){
    try {
        const {chatMessages} =await request.json();
        console.log(chatMessages)

        return NextResponse.json({message:"Hi how are you"})
    } catch (error) {
        console.log(error);
    }
}