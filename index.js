const todoRoute = require('./routers/todoRoutes')
const userRoute = require('./routers/userRoutes')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app=express()
app.use(express.json())

mongoose.connect(process.env.CONNECTION_STRING).then((msg)=>{
    console.log("Connection successful")
    
}).catch((err)=>{
    console.log("Connection String: "+process.env.CONNECTION_STRING)
    console.log(err)
}).finally(()=>{
    console.log("Connection attempt at: "+Date.now())
})
app.use('/todo',todoRoute)
app.use('/user',userRoute)

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
