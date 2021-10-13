const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type Todo {
        id: ID!
        title: String!
        done: Boolean!
        createdAt: String
        updatedAt: String
    }
    
    input TodoCreate {
        title: String!
    }
    
    type Query {
        getTodos: [Todo!]!
    }
    
    type Mutation {
        addTodo(todo: TodoCreate): Todo!
        completeTodoRequest(id:ID!): Todo!
        deleteTodo(id:ID!): [Todo!]!
    }
`)