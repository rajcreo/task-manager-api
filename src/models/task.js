const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
     },
     completed: {
         type: Boolean,
         default: false
     },
     owner: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
     } 
},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

// const task = new Task({
//     description: '    make a call    '
// })

// task.save().then(() => {
//     console.log(task)
// }).catch(() => {
//     console.log(error)
// })

module.exports = Task