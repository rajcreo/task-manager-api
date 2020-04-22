const express = require('express');
// require('dotenv').config({path: '../config/dev.env'})
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT 

// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next();
//     }
// })
// app.use((req, res, next) => {
//  res.status(503).send('Temporarly shutdown for maintanance. Check back soon')
// })


// const multer = require('multer')
// const upload = multer({
//     dest: 'imgaes',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('File must be a word document'))
//         }
//         cb(undefined, true)
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// },(error, req, res, next)=> {
//     res.status(400).send({ error: error.message })
// })







app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// 
// without middleware: new request -> run route handler
// 
// with middleware: new requesr -> do something -> run router handler
// 

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})


// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red1234!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'qer12346' }, 'thisisimynewcourse', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'thisisimynewcourse')
//     console.log(data)
// }

// myFunction()



// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async() => {
//     // const task = await Task.findById('5e9cbe4bd5e6734697b65017')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
//     const user = await User.findById('5e9cbd220dd36d466fde9b05')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()