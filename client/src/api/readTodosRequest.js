import { API_URL } from "./config";

export default (token)=>{
    return fetch(`${API_URL}/todos`,{
        method:"GET",
        headers:{
            Authorization :`Bearer ${token}`, // for now i am hardcoding token here but i will come back here to refactor it
            "Content-Type" : "application/json"
        }
    })
    .then(response => response.json());
}