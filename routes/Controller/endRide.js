const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver")
const Ride = require("../../models/ride")
const Rider = require("../../models/rider")
// const {connect,disconnect} = require("../../models/functions/connect")

const driverAtDestination = (xa,ya,xb,yb)=>{
    if(xa==xb && ya==yb) return true
    return false
}
router.post("/",async(req,res)=>{
    try{

        const driverId= req.body.driverId
        const rideId = req.body.rideId
        let driver = await Driver.findById(driverId)
        let ride = await Ride.findById(rideId)
        if(ride.status==="Done") {return res.send(`Ride[id: ${rideId}] already ended`)}
        if(String(ride.driver.id)!==driverId) {return res.send(`Driver[id: ${driverId}] is not booked for this ride`)}
        if(!driverAtDestination(driver.position.x_coordinate,driver.position.y_coordinate,ride.destination.x_coordinate,ride.destination.y_coordinate)){
            return res.send(`Driver [id: ${driverId}] not at Destination`)
        }
        driver = await Driver.findByIdAndUpdate(driverId,{
            $set:{
                status: "Free",
            },
            $inc:{
                total_rides: 1
            }
        })
        ride = await Ride.findByIdAndUpdate(rideId,{
            $set:{
                status: "Done"
            }
        })
        const rider = await Rider.findByIdAndUpdate(ride.rider.id,{
            $set:{
                currentlyInRide:false,
            },
            $inc:{
                walletBalance: -ride.costInRupees
            }
        })
        res.send(`Ending ride with driverId=${driverId} and rideId=${rideId}`)
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router