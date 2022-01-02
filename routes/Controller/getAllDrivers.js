const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver");
// const {connect,disconnect} = require("../../models/functions/connect")



// Response: [{“id”:5,“name”:”Ramesh”, “rating”: 3.6, “status”: Free/Busy,
//     “position”:{“x_coordinate”:3, “y_coordinate”:5}, “total_rides”: 10}]
    

router.get("/",async (req,res)=>{
    try{
        let driver = await Driver.find().select({__v:0})
        if(driver.status!=="Free") driver.status="Busy"
        res.send(driver)
    }
    catch(err){
        console.log(err)
    }
        
    

})

module.exports = router