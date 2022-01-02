const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver")
const Rider = require("../../models/rider")
const Ride = require("../../models/ride")
// const {connect,disconnect} = require("../../models/functions/connect")

const getDistance = (xa,ya,xb,yb)=>{
    const x=Math.pow(Math.abs(xa-xb),2)
    const y=Math.pow(Math.abs(ya-yb),2)
    const d = Math.sqrt(x+y)
    return d
}
const atSource = (src_x_coord,src_y_coord,dest_x_coord,dest_y_coord)=>{
    if(src_x_coord===dest_x_coord && src_y_coord===dest_y_coord) return true
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
    
    while(!atSource(driver.position.x_coordinate,driver.position.y_coordinate,dest_x_coord,dest_y_coord)){
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

        const src_x_coord = req.body.source.x_coordinate
        const src_y_coord = req.body.source.y_coordinate
        const dest_x_coord = req.body.destination.x_coordinate
        const dest_y_coord = req.body.destination.y_coordinate
        const riderId = req.body.riderId
        const autoMatch = req.query.automatch
        let driverId
        if(autoMatch==="true"){
            const driver = await Driver.find({status: "Free"}).select({__v:0})
            let maxR=0,minD=10000000
            let nearestDriver
            driver.forEach((d)=>{
                let dist = getDistance(src_x_coord,src_y_coord,d.position.x_coordinate,d.position.y_coordinate).toFixed(4)
                //console.log(dist," ",minD)
                if(dist<minD){
                    minD=dist
                    nearestDriver=d
                    maxR=d.rating
                }
                else if(dist==minD){
                    if(d.rating>maxR){
                        nearestDriver=d
                        maxR=d.rating
                    }
                }
            })
            driverId=nearestDriver._id
            
        }
        else{
            driverId = req.body.driverId
            const driver = await Driver.findById(driverId)
            if(driver.status!=="Free") return res.send(`Driver[id: ${driverId}] is not Free`)
            //res.send(`Booking rider with id = ${driverId} and rideId=${rideId}`)
        }
        const rider = await Rider.findById(riderId)
        const driver = await Driver.findByIdAndUpdate(driverId,{
            $set:{
                status: "ToBePickedUp"
            }
        },{new:true})
        let dist = getDistance(src_x_coord,src_y_coord,dest_x_coord,dest_y_coord).toFixed(2)
        const ride = new Ride({
            source:{
                x_coordinate:src_x_coord,
                y_coordinate:src_y_coord
            },
            destination:{
                x_coordinate:dest_x_coord,
                y_coordinate:dest_y_coord
            },
            durationInMins:dist,
            costInRupees:2*dist,
            rider:{
                id:riderId,
                name:rider.name
            },
            driver:{
                id:driver._id,
                name:driver.name
            }
        })
        await ride.save()
        const data = {
            "driverDetails":{
                "id": driver._id,
                "name": driver.name,
                "driverLocation":{
                    "x_coordinate": driver.position.x_coordinate,
                    "y_coordinate": driver.position.y_coordinate
                }
            },
            "rideId":ride._id
        }
        res.json(data)
        await updatePosition(driverId,src_x_coord,src_y_coord)
    }
    catch(err){
        console.log(err)
    }

})

module.exports = router