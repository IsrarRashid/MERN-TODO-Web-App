const TodoModel = require("../models/todoModel");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    todo.text = req.body.text;
    todo.completed = req.body.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
