const mongoose = require("mongoose");

//change data of user
function parseId (id) {
    return mongoose.Types.ObjectId(id);
  }; //this function change id string into a ObjectId

module.exports = {parseId}