var mongoose = require("mongoose");


var professorSchema = mongoose.Schema({
    title:String, //designation of the professor
    name:String, 
    description:String,
    author:{
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        },
        username: String
  },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
        ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Preview"
        }
        ],
});

module.exports = mongoose.model("Professor",professorSchema);