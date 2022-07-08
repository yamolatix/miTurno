const mongoose = require("mongoose");

//change data of user
module.exports = function (id) {
  return mongoose.Types.ObjectId(id);
} //this function change id string into a ObjectId

