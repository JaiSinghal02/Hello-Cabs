const express = require("express")
const router = express.Router()


// f(time taken) = 1 minute * distance b/w source and destination
// f(cost) = 2 rupees * distance b/w source and destination
// If no cars are present nearby, convey the same to the user.
// Note: Distance b/w (1,1) and (4,5) is square_root(9+16) = 5.

router.get("/",(req,res)=>{
    const src_x_coord = req.body.source.x_coordinate
    const src_y_coord = req.body.source.y_coordinate
    const dest_x_coord = req.body.destination.x_coordinate
    const dest_y_coord = req.body.destination.y_coordinate
    const x_dist = Math.pow(Math.abs(src_x_coord-dest_x_coord),2)
    const y_dist = Math.pow(Math.abs(src_y_coord-dest_y_coord),2)
    const dist = Math.sqrt(x_dist+y_dist).toFixed(2)
    const time = 1*dist
    const cost = 2*dist
    const response = {
        "timeNeededInMinutes":time,
        "costInRupees":cost
    }
    res.send(response)
})

module.exports = router