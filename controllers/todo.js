const Todo = require("../models/todo");

class TodoControllers {
    async getAllTasks(req, res){
        try {
            const todos = await Todo.findAll();
            res.status(200).json({todos})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Server error'
            })
        }
    }

    async createTask(req, res){
        try {
            const todo = await Todo.create({
                title: req.body.title,
                done: false
            })
            res.status(201).json({todo})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Server error'
            })
        }
    }

    async updateTaskById(req,res){
        try {
            const todo = await Todo.findByPk(+req.params.id)
            todo.done = req.body.done
            await todo.save()
            res.status(200).json({todo})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Server error'
            })
        }
    }
    async deleteTaskById(req,res){
        try {
            const todo = await Todo.findByPk(+req.params.id);
            await todo.destroy()
            const todos = await  Todo.findAll();
            res.status(200).json({todos})
        }catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Server error'
            })
        }
    }
}

module.exports = new TodoControllers()