const express = require('express');
const router = express.Router();
const Todo = require('./todoModel');

// Get all Todo items
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new Todo item
router.post('/', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Todo item
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (req.body.completed != null) {
            todo.completed = req.body.completed;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a Todo item
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
