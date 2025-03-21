import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


//route to get todo by id
export async function GET(req:NextResponse,{params}:{params:{id:string}}) {
    //code to get a todo by params
    const id = params.id;
    try {
        const response = await prisma.todo.findUnique({
            where:{
                id:Number(id)
            }
        })
        return Response.json(response);
    } catch {
        return Response.json({message:"There was an error"});
    }
}


//route to delete todo by id
export async function DELETE(req:NextResponse,{params}:{params:{id:string}}) {
        const id = params.id;
        try {
            const response = await prisma.todo.delete({where:{id:Number(id)}});
            return Response.json(response);
        } catch {
            return Response.json({message:"There was an error"});
        }
}