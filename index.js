const todoRoute = require('./routers/todoRoutes')
const userRoute = require('./routers/userRoutes')
const express = require('express')

const app=express()
app.use('todo',todoRoute)
app.use('user',userRoute)

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
