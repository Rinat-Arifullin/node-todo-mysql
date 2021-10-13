const deleteTodoQuery = (id) => (
    `mutation{
        deleteTodo(id: ${id}){
           id title done createdAt updatedAt
        }
    }`
)

const getTodosQuery =  (
    ` query{
            getTodos{
                title id done createdAt updatedAt
            }
      }`
)

const addTodoQuery = (title)=>(`
    mutation{
        addTodo(todo:{title: "${title}"}){
            id title done createdAt updatedAt
        }
    }
`)

const completeTodoQuery = (id) => (`
    mutation{
      completeTodoRequest(id: ${id}){
        id updatedAt
      }
    }
`)

const fetchOptions = (query) => ({
    method: 'post',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({query})
})

new Vue({
    el: '#app',
    data() {
        return {
            isDark: true,
            show: true,
            todoTitle: '',
            todos: []
        }
    },

    created(){
        fetch('/graphgl', fetchOptions(getTodosQuery))
            .then(res => res.json())
            .then((response)=> this.todos = response.data.getTodos)
    },

    methods: {
        addTodo() {
            const title = String(this.todoTitle.trim())

            if (!title) {
                return
            }

            fetch('/graphgl', fetchOptions(addTodoQuery(title)))
                .then(res=>res.json())
                .then((response)=> {
                    this.todos.push(response.data.addTodo)
                    this.todoTitle = ''
                })
                .catch(err => console.log(err))
        },

        removeTodo(id) {
            fetch('/graphgl', fetchOptions(deleteTodoQuery(id)))
                .then(res => res.json())
                .then((response)=>this.todos = response.data.deleteTodo)
                .catch((e)=>console.log(e))
        },

        completeTodo(id){
            fetch('/graphgl', fetchOptions(completeTodoQuery(id)))
                .then(res => res.json())
                .then((response)=>{
                    const todo = response.data.completeTodoRequest
                    const idx = this.todos.findIndex(t => +t.id === +todo.id)
                    const newTodosList = [...this.todos]
                    if(todo.updatedAt && newTodosList[idx].updatedAt){
                        newTodosList[idx].updatedAt = todo.updatedAt
                    }
                    this.todos = newTodosList
                })
                .catch(e => console.log(e))
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime) {
            return new Date(+value).toLocaleDateString()
        }
    }
})