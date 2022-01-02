const express = require("express")
const app= express()
const router= require("./routes/index")
require('dotenv').config()
const {connect} = require("./models/functions/connect")
// const connect = require("./databaseClient")
// const print = ()=>{console.log("Connected...")}
// connect(print)


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)

connect()
const port= process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})