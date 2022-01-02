const express= require("express")
const router = express.Router()
const Driver = require("../../models/driver");
// const { connect, disconnect } = require("../../models/functions/connect");



// Response: {“name”:”Ramesh”, “rating”: 3.6, “status”:
//     Free/ToBePickedUp/RideStarted, “position”:{“x_coordinate”:3, “y_coordinate”:5},
//     “total_rides”: 10, “rideId”: “ride123”}
//     Note: Ride Id is the unique id for the ride. If status=Free, then the rideId will be
//     empty/null.
    

router.get("/",async (req,res)=>{
    try{
        const id= req.query.id //driver id
        let driver = await Driver.findById(id).select({__v:0})
        if(!driver) return res.send("Wrong ID")
        res.send(driver)
    }
    catch(err){
        console.log(err)
    }
    
    // res.send(`Getting driver details for id = ${id}`)
})

module.exports = router