const TodoModel = require("../models/todoModel");

module.exports = async (req,res)=>{
    const {id} = req.params;
    const result = await TodoModel.deleteOne({_id:id});
    if(result.deletedCount === 0){
        return res.status(404).json({message: "Todo Not Found!"});
    }
    res.status(200).json({message: "Todo Deleted Successfully"});
};