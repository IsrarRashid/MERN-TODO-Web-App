import { API_URL } from "./config";

export default (todo,token)=>{
    return fetch(`${API_URL}/todos/${todo._id}`,{
        method:"DELETE",
        headers:{
            Authorization :`Bearer ${token}`, // for now i am hardcoding token here but i will come back here to refactor it
            "Content-Type" : "application/json"
        }
    })
}