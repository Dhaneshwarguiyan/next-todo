//route to get all todo
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    //get all todos
    try {
        const response = await prisma.todo.findMany({});
        return Response.json(response);
    } catch {
        return Response.json({message:"there was an error"});
    }

}

//route to create a todo
export async function POST(req:Request) {
    const data = await req.json();
    const { todo } = data;
    try {
        const response = await prisma.todo.create({
            data:{
                todo:todo,
                completed:false
            }
        })
        return Response.json(response);
    } catch {
        return Response.json({message:"There was an error"});
    }
}