import { todoType } from "@/types/todo"
import Delete from "@/icons/Delete"
import axios from "axios";

const Todo = ({todo,setRerender,reRender}:{todo:todoType,setRerender:React.Dispatch<React.SetStateAction<number>>,reRender:number}) => {
    const date = new Date(todo.createdAt);
    const deleteTodo = async() => {
        try {
            await axios.delete(`http://localhost:3000/api/${todo.id}`);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = () => {
        deleteTodo();
        setRerender(reRender+1);
    }
  return (
    <div className="flex items-center justify-between gap-2 w-full border border-slate-700 rounded-lg py-2 px-4">
        <div className="flex items-center gap-2">
            <input type="checkbox" className="p-2 cursor-pointer"/>
            <div>
                {todo.todo}
            </div>
        </div>
        <div className="flex items-center gap-2 text-red-500">
            <div className="text-slate-500">{date.toDateString()}</div>
            <span onClick={handleDelete} className="cursor-pointer"><Delete /></span>
        </div>
    </div>
  )
}

export default Todo
