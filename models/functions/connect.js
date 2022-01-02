const mongoose = require('mongoose');
let disconnect=()=>{
    mongoose.connection.close()
    console.log("Disconnected...")
}
const connect = function(){
    mongoose.connect(process.env.URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true})
    console.log("Connected...")
}

module.exports = {connect,disconnect}
    