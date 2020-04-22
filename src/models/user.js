const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken')
const Task = require('./task')


const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is inavlid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be positive number')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password connot contain passwaord')
            }
        }
    },
    avatar:{
        type: Buffer
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject 
}


userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' })

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token;
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user){
        return 0;   
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return 0;
    }

    return user
}


userSchema.plugin(uniqueValidator);


userSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
} )


// delete tasks when user removed
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id})
    next()
})


const User = mongoose.model('User', userSchema)
// instances
// const me = new User({
//     name: 'Ritu   ',
//     email: 'mike@gmail.com',
//     age: 20,
//     password: 'rajcreo99'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })



module.exports = User