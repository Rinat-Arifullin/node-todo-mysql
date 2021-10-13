const Todo = require('../models/todo')

module.exports = {
    async getTodos(){
        try {
            return await Todo.findAll()
        }catch (e){
            throw new Error('error')
        }
    },

    async addTodo({todo}){
        try{
            return await Todo.create({
                title:  String(todo.title),
                done: false
            })
        }catch (e) {
            throw  new Error('error')
        }
    },

    async completeTodoRequest({id}){
        try {
            const todo = await Todo.findByPk(id)
            todo.done = true
            await todo.save()
            return todo
        }catch (e){
            throw  new Error('ID is required')
        }
    },

    async deleteTodo({id}){
        try {
            const todo = await Todo.findByPk(id);
            await todo.destroy()
            return await Todo.findAll();
        }catch (e) {
            throw  new Error('error')
        }
    }
}