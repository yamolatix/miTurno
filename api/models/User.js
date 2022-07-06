const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 255,
    },
    lname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 2,
      maxlength: 255,
    },
    dni: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minlength: 6,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 25,
    },
    admin: {
      type: Boolean,
      required: false,
      default: false,
    },
    operator: {
      type: Boolean,
      required: false,
      default: false,
    },
    phone: {
      type: String,
      required: false,
      lowercase: true,
      minlength: 7,
      maxlength: 25,
    },
    birthdate: {
      type: String,
      required: false,
      minlength: 8,
      maxlength: 12,
    },
    address: {
      type: String,
      require: false,
      lowercase: true,
      minlength: 8,
      maxlength: 255,
    },
    branchOffice: [{
      type: Schema.Types.ObjectId,
      ref: "BranchOffice",
    }],
    appointment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

/*
User.find({ operator: true }, function (err, result) {
  if (error) throw error;
  console.log(result);
})
*/

// https://www.youtube.com/watch?v=N3ny7bvS_IM&t=1s&ab_channel=codigofacilito
// https://www.youtube.com/watch?v=ii2qM91Ing0&ab_channel=krpajay
