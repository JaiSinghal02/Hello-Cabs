const mongoose = require('mongoose')

const Rider = mongoose.model('Rider', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trime: true
    },
    currentlyInRide:{
        type: Boolean,
        default: false
    },
    walletBalance:{
        type: Number,
        default: 1000000
    }
    // rides:[mongoose.Schema.Types.ObjectId],
    // rideId:{
    //     type: mongoose.Schema.Types.ObjectId,
    // }
}))

module.exports = Rider