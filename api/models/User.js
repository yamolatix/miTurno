const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  lname: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //Ver este atributo.
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
  branchOffice: [
    {
      required: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranchOffice",
    },
  ],
  operator: {
    type: Boolean,
    required: false,
    default: false,
  },
  phone: {
    type: String,
    required: false,
    min: 7,
    max: 255,
  },
  birthdate: {
    type: String,
    required: false,
    min: 8,
    max: 12,
  },
  address: {
    type: String,
    require: false,
    min: 8,
    max: 255,
  },
});

module.exports = mongoose.model("User", userSchema);

/*
User.find({ operator: true }, function (err, result) {
  if (error) throw error;
  console.log(result);
})
*/

// https://www.youtube.com/watch?v=N3ny7bvS_IM&t=1s&ab_channel=codigofacilito
// https://www.youtube.com/watch?v=ii2qM91Ing0&ab_channel=krpajay