const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-handler')

const index = asyncWrapper(async (req, res) => {

    const tasks = await Task.find({})
    res.status(200).json({ success: true, data: { tasks, nbHits: tasks.length}})
    /* this is the equivalent for the asyncwrapper
    try {
        const tasks = await Task.find({})
        res.status(200)
            .json({ success: true, data: { tasks, nbHits: tasks.length}})
    } catch(err) {
        res.status(500).json({msg: err})
    }*/
})

const store = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
    /*try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch(err) {
        res.status(422).json(err)
    }*/
})

const show = asyncWrapper(async (req, res, next) => {

    const task = await Task.findById(req.params.id)
    if(!task) {
        return next(createCustomError('Not Found', 404))
    }
    res.status(200).json(task)
    /*try {
        const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).json({msg: 'Task not found'})
        }

        res.status(200).json(task)
    } catch(err) {
        res.status(500).json({msg: err})
    }*/
})

const update = asyncWrapper(async (req, res, next) => {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
   
    if(!task) {
        return next(createCustomError('Not Found', 404))
    }
    res.status(200).json({success: true, msg: 'Task Updated!'})
    /*try {
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
    }*/
})

const destroy = asyncWrapper(async (req, res, next) => {

    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) {
        return next(createCustomError('Not Found', 404))
    }

    /*try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).json({msg: 'Task not found'})
        }

        res.status(201).json({success: true, msg: 'Task Deleted!'})
    } catch(err) {
        res.status(500).json({msg: err})
    }*/
})

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}