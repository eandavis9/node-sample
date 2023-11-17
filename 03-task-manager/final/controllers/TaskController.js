const Task = require('../models/Task')

const index = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200)
            .json({ success: true, data: { tasks, nbHits: tasks.length}})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const store = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch(err) {
        res.status(422).json(err)
    }
}

const show = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).json({msg: 'Task not found'})
        }

        res.status(200).json(task)
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const update = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
       
        if(!task) {
            return res.status(404).json({msg: 'Task not found'})
        }
        res.status(200).json({success: true, msg: 'Task Updated!'})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

const destroy = async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).json({msg: 'Task not found'})
        }

        res.status(201).json({success: true, msg: 'Task Deleted!'})
    } catch(err) {
        res.status(500).json({msg: err})
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}