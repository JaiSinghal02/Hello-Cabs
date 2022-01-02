const express = require("express")
const router = express.Router()
const Ride = require("../../models/ride")
const Driver = require("../../models/driver")
// const {connect,disconnect} = require("../../models/functions/connect")

router.post("/",async(req,res)=>{
    try{

        const riderId= req.body.riderId
        const rating = parseFloat(req.body.rating)
        const rideId = req.body.rideId
        const ride = await Ride.findByIdAndUpdate(rideId,{
            $set:{
                rating: rating
            }
        })
        let driver =await Driver.findById(ride.driver.id)
        const newRating = ((driver.rating*(driver.total_rides-1))+rating)/driver.total_rides
        await Driver.findByIdAndUpdate(driver._id,{
            $set:{
                rating: newRating.toFixed(2)
            }
        })
        // res.send(`Rider with id=${riderId} has rated ${rating} stars to ride with id=${rideId}`)
    }
    catch(err){
        console.log(err)
    }

})


module.exports = router