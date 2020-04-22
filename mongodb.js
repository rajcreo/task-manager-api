// CRUD create read update opration



// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
// above syntax can be used in single line 

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// generating id 
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }
    
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Raj',
    //     age: 21
    // }, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to connect to database')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Raju',
    //         age: 22
    //     }, {
    //         name: 'Rani',
    //         age: 19
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to connect to database')
    //     }
    //     console.log(result.ops)
    // })




    // fetching dtata
    // db.collection('users').findOne( { _id: ObjectID("5e98083c91818004aa310e8a")}, (error, user) => {
    //     if(error){
    //         return console.log("Unable to find")
    //     }
    //     console.log(user)
    // }) 

    // db.collection('users').find({ age: 21}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({ age: 21}).count((error, count) => {
    //     console.log(count)
    // })





    // update 
    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectID("5e9767ab0b65cbaf322fe52f")
    // },{
    //     // $set: {
    //     //     name: 'Mohit'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('task').updateMany({
    //     completed: false
    // },{
    //       $set:{
    //           completed: true
    //       }
    // }).then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })
     


    // delete operation 
    // db.collection('users').deleteMany({
    //     age: 22,
    //     name: 'Raju'
    // }).then((result) => {
    //     console.log(result.deletedCount)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('task').deleteOne({
        description: "Clean the house"
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})