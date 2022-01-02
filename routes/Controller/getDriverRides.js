const express = require("express")
const router = express.Router()
const Ride = require("../../models/ride")
// const {connect,disconnect} = require("../../models/functions/connect")


// Response: [{“rideStartTime”:<timestamp>, “source”:{“x_coordinate”:3,
//     “y_coordinate”:5}, “destination”:{“x_coordinate”:3, “y_coordinate”:5},
//     “durationInMins”:10,”costInRupees”:10, “rider”: {“id”:100,”name”:”Kali”}, “status”:
//     “Done/Live”}, “rating”: 3}]
    
router.get('/',async (req,res)=>{
    try{

        const id=req.query.id //driver id
        const ride = await Ride.find({"driver.id":id}).select({__v:0,rider:0})
        res.send(ride)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router