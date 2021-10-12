const {Router} = require('express')
const todoControllers = require('../controllers/todo')
const Todo = require('../models/todo')
const router = Router()

const {getAllTasks, createTask, updateTaskById, deleteTaskById} = todoControllers;

// Получение списка задач
router.get('/', getAllTasks)

// Создание новой задачи
router.post('/', createTask)

// Обновление задачи
router.put('/:id', updateTaskById)

// Удаление задачи
router.delete('/:id', deleteTaskById)

module.exports = router