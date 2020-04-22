const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch{
        res.status().send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc
// GET /tasks?completed=true&sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {} 
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed ==='true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        // const tasks = await Task.find({ owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort  // createdAt: -1,// completed: -1 // 1 for ascending or false
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e){
        res.status(400).send(e)
    }   
  
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch{
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})



// Updating



router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOPeration = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOPeration){
        res.status(400).send({ error: 'Invlid Update'})
    }
    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id, { new: true, runValidators: true })
        
        if(!task){
            return res.status(404).send()
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        
        res.send(task)
    } catch(e){
        res.status(400).send(e)
    }
})




// Delete operation



router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})





module.exports = router