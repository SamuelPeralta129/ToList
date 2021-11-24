const express = require('express');
const router = express.Router();
const Task = require('../models/task.js');

//Show
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log(tasks);
    res.json(tasks);
        
});

//Add
router.post('/', async(req, res) => {
    const { description } = req.body;
    const task = new Task({description});
    await task.save();
    res.json({status: 'Task Saved'});
    
}); 

//Upgrade
router.put('/:id', async(req, res) => {
    const { description } = req.body;
    const newTask = {description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Task Updated'});
});

//Delete
router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
});

module.exports = router;