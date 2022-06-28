const { Schema, model } = require("mongoose");

function getPrice(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

const branchOfficeSchema = new Schema(
  {
    location: {
      type: String,
      lowercase: true,
      required: [true, "Location is required"],
    },
    address: {
      type: String,
      lowercase: true,
      required: [true, "Address is required"],
    },
    phone: { type: Number, required: [true, "Phone is required"] },
    email: {
      type: String,
      lowercase: true,
      unique: [true, "This email already exists"],
      required: true,
      maxlength: 100,
      match: [/.+\@.+\..+/, "Fill a valid email address"],
    },
    startTime: { type: Number, required: [true, "Start time is required"] },
    endTime: { type: Number, required: [true, "End time is required"] },
    days: { type: Number, required: [true, "Day is required"] },
    simultAppointment: { type: Number, default: 0 },
    price: { type: Schema.Types.Decimal128, default: 0, get: getPrice },
    id: false,
  },
  { timestamps: true },
  { toJSON: { getters: true } }
);
//la propiedad lowercase pone en minúsculas la cadena de string antes de guardar.
//timestamps es una propiedad de monoogse que maneja automáticamente la createdAt y updatedAt
//ver como vamos a manejar los días
//turnos simultáneos -> ver como se solicitan

module.exports = model("BranchOffice", branchOfficeSchema)