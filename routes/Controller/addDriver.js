const express = require("express");
const router = express.Router()
// const client = require("../../databaseClient");
const Driver = require("../../models/driver")
const {connect,disconnect} = require("../../models/functions/connect")

router.post("/",async(req,res)=>{
    try{

        const name= req.body.name
        const x_pos= req.body.position.x_coordinate
        const y_pos= req.body.position.y_coordinate
        const total_rides= req.body.total_rides
        const rating = req.body.rating
        let driver = new Driver({
                        name:name,
                        rating:rating,
                        total_rides:total_rides,
                        position:{
                            x_coordinate:x_pos,
                            y_coordinate:y_pos,
                        }
                    })
        await driver.save()
        res.send(driver)
    }
    catch(err){
        console.log(err)
    }

})

module.exports = router