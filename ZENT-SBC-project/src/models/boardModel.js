const  mongoose  = require("mongoose");
const dataSchema = new mongoose.Schema({
    boardId : String,
    boardTitle : String,
    boardDate : Date,
    lists : Array
})

const trelloDataModel = mongoose.model("Board",dataSchema);
module.exports = trelloDataModel;