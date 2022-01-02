const mongoose = require("mongoose")

const Ride = mongoose.model("Ride", new mongoose.Schema({
    rideStartTime:{
        type: Date
    },
    source:{
        x_coordinate: {type: Number},
        y_coordinate:{type: Number}
    },
    destination:{
        x_coordinate: {type: Number},
        y_coordinate:{type: Number}
    },
    durationInMins:{type:Number},
    costInRupees:{type:Number},
    status:{
        type: String,
        default: "Live"
    },
    rating:{type:Number},
    rider:{
        id:{type: mongoose.Schema.Types.ObjectId},
        name:{type: String}
    },
    driver:{
        id:{type: mongoose.Schema.Types.ObjectId},
        name:{type: String}
    }
}))

module.exports = Ride