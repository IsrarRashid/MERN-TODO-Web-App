const express = require('express');
const router = express.Router();
const isLoggedIn = require("./middleware/isLoggedIn");
const createTodoRoute = require("./routes/createTodoRoute");
const readTodosRoute = require("./routes/readTodosRoute");
const updateTodoRoute = require("./routes/updateTodoRoute");
const deleteTodoRoute = require("./routes/deleteTodoRoute");

// http://localhost:8080/todos => type in postman
router.post("/login",require("./routes/loginRoute"));

router.post("/todos", isLoggedIn, createTodoRoute);
router.get("/todos", isLoggedIn, readTodosRoute);
router.put("/todos/:id", isLoggedIn,updateTodoRoute );
router.delete("/todos/:id", isLoggedIn,deleteTodoRoute );



module.exports = router;