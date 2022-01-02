const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver")
const Ride = require("../../models/ride")
const Rider = require("../../models/rider")
// const {connect,disconnect} = require("../../models/functions/connect")

const driverAtSource = (xa,ya,xb,yb)=>{
    if(xa==xb && ya==yb) return true
    return false
}
const driverAtDestination = (xa,ya,xb,yb)=>{
    if(xa==xb && ya==yb) return true
    return false
}
const updateDriverPosition = (driver, desX, desY)=>{
    let srcX = driver.position.x_coordinate
    let srcY = driver.position.y_coordinate
    if(srcX!==desX){
        if(srcX<desX){
            driver.position.x_coordinate = Math.min(srcX+3,desX)
        }
        else{
            driver.position.x_coordinate = Math.max(srcX-3,desX)
        }
    }
    else{
        if(srcY<desY){
            driver.position.y_coordinate = Math.min(srcY+3,desY)
        }
        else{
            driver.position.y_coordinate = Math.max(srcY-3,desY)
        }
    }
}
const updatePosition = async(driverId,dest_x_coord,dest_y_coord)=>{
    let driver = await Driver.findById(driverId)
    console.log(`\nRide starting for driver[id: ${driverId}]`)
    while(!driverAtSource(driver.position.x_coordinate,driver.position.y_coordinate,dest_x_coord,dest_y_coord)){
        await new Promise(resolve=>
            setTimeout(()=>{
                updateDriverPosition(driver,dest_x_coord,dest_y_coord)
                resolve()
            },2000)
            
        )
        console.log(`Driver[id: ${driver._id}] at X=${driver.position.x_coordinate} , Y=${driver.position.y_coordinate}`)
        driver = await Driver.findByIdAndUpdate(driverId,{
            $set:{
                position:{
                    x_coordinate: driver.position.x_coordinate,
                    y_coordinate: driver.position.y_coordinate
                }
            }
        },{new:true})
    }
}
router.post("/",async(req,res)=>{
    try{

        const driverId = req.body.driverId
        const rideId = req.body.rideId
        let driver = await Driver.findById(driverId)
        let ride = await Ride.findById(rideId)
        if(ride.status==="Done") {return res.send(`Ride[id: ${rideId}] finished`)}
        if(String(ride.driver.id)!==driverId) {return res.send(`Driver[id: ${driverId}] is not booked for this ride`)}
        if((!driverAtSource(driver.position.x_coordinate,driver.position.y_coordinate,ride.source.x_coordinate,ride.source.y_coordinate)) && driver.status!=="RideStarted"){
            return res.send(`Driver[id: ${driverId}] not at source`)
        }
        if(driverAtDestination(driver.position.x_coordinate,driver.position.y_coordinate,ride.destination.x_coordinate,ride.destination.y_coordinate)){
            return res.send(`Driver[id: ${driverId}] already at destination`)
        }
        driver = await Driver.findByIdAndUpdate(driverId,{
            $set:{
                status: "RideStarted"
            }
        })
        ride = await Ride.findByIdAndUpdate(rideId,{
            $set:{
                rideStartTime: new Date()
            }
        })
        const rider = await Rider.findByIdAndUpdate(ride.rider.id,{
            $set:{
                currentlyInRide: true
            }
        })
        res.send(`Starting ride with driverId=${driverId} and rideId=${rideId}`)
        updatePosition(driverId,ride.destination.x_coordinate,ride.destination.y_coordinate)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router