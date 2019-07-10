var mongoose    = require("mongoose");


var textbookSchema = mongoose.Schema({
    title:String,
    description:String,
    time: { type: Date, default: Date.now },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});



module.exports  = mongoose.model("Textbook",textbookSchema);