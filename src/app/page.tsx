"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { todoType } from "@/types/todo";
import Todo from "@/components/todo";

export default function Home() {
  const [todo,setTodo] = useState<string>("");
  const [reRender,setRerender] = useState<number>(0);
  const [todos,setTodos] = useState<todoType[]>([]);
  const createTodo = async()=>{
        try {
            await axios.post('http://localhost:3000/api',{todo:todo});
        } catch (error) {
            console.log(error);
        }
  }
  const getAllTodo = async()=>{
    try {
        const response = await axios.get('http://localhost:3000/api');
        setTodos(response.data);
    } catch (error) {
        console.log(error);
    }
  }
  const handleSubmit = (e:React.MouseEvent) => {
      e.preventDefault();
      setTodo("");
      createTodo();
      setRerender(reRender+1);
  }
  const handleTodo = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }

  useEffect(()=>{
    getAllTodo();
  },[reRender])
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-24">
        <div className="text-4xl font-semibold">My Todo app</div>
          <form className="flex justify-center pt-2 gap-4">
              <input className="border border-slate-700 rounded-lg py-2 px-3" type="text" name="todo" value={todo} placeholder="Enter your todo" onChange={handleTodo}/>
              <button className="bg-slate-600 px-3 py-2 rounded-lg" onClick={handleSubmit}>Create todo</button>
          </form>
          <div className="flex flex-col gap-2 mt-2 w-[20%]">
                {
                  todos.map((todo,key)=>{
                    return <Todo todo={todo} key={key} setRerender={setRerender} reRender={reRender}/>
                  })
                }
          </div>
    </div>
  );
}
