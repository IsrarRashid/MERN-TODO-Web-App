import { API_URL } from "./config";

export default (todo,token)=>{
    return fetch(`${API_URL}/todos/${todo._id}`,{
        method:"PUT",
        headers:{
            Authorization :`Bearer ${token}`, // for now i am hardcoding token here but i will come back here to refactor it
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            text:todo.text,
            completed: todo.completed
        })
    })
    .then(response => response.json());
}