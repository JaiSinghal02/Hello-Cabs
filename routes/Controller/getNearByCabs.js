const express = require("express")
const router = express.Router()
const Driver = require("../../models/driver")
// const {connect,disconnect} = require("../../models/functions/connect")

const checkDistance = (xa,ya,xb,yb,r)=>{
    const xd = Math.pow(Math.abs(xa-xb),2)
    const yd = Math.pow(Math.abs(ya-yb),2)
    const d = Math.round(Math.sqrt(xd+yd))
    if(d<=r){
        return true
    }
    const diff = d-r
    if(diff<=2) {return true}
    return false
}
router.get("/",async(req,res)=>{
    try{

        const x_coord = req.body.location.x_coordinate
        const y_coord = req.body.location.y_coordinate
        const radius = req.body.radiusInMetres
        const drivers = await Driver.find({status:"Free"}).select({__v:0,status:0})
        const driver = []
        drivers.forEach((d)=>{
            if(checkDistance(x_coord,y_coord,d.position.x_coordinate,d.position.y_coordinate,radius)){
                driver.push(d)
            }
        })
        res.send(driver)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router