var mongoose    = require("mongoose");


var reviewSchema = mongoose.Schema({
    title:String,
    description:String,
    rating:Number,
    time: { type: Date, default: Date.now },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});



module.exports  = mongoose.model("Review",reviewSchema);