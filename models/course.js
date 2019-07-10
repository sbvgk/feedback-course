var mongoose = require("mongoose");


var courseSchema = mongoose.Schema({
    title:String,
    name:String,
    description:String,
    professor:String,
    author:{
          id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          },
          username: String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
        ],
    textbooks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Textbook"
        }
        ]
});

module.exports = mongoose.model("Course",courseSchema);