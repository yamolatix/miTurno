const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    date: { // 01 - 31
        type: String,
        maxlength: 2
    },
    month: { // 00 - 11
        type: String,
        maxlength: 2
    }, 
    year: {// 2022
        type:String,
        maxlength: 4
    },
    day: { // 0 a 6
        type: String,
        maxlength:1
    },
    time: { // 09:15 - modificar a time 
        type: String,
        maxlength:5 //a 5
    },
    available: {
        type: Boolean,
        default: true,
    },
    state: {
        type: String,
        enum: ['pendiente de pago', 'confirmado', 'cancelado por cliente', 'cancelado por sucursal', 'finalizado']
    },
    branchOffice: {
        type: mongoose.Types.ObjectId,
        ref: 'BranchOffice'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    //Box ?
}, { timestamps: true });

//Para traer los datos en su totalidad.
/* const union = await Appointment.aggregate(
    [
        {
            $lookup: {
                from: 'User',
                localField: 'user',
                foreignField: '_id',
                as: 'turnoUsuario',
            }
        }
    ]
) */

module.exports = mongoose.model('appointment', appointmentSchema)

// https://mongoosejs.com/docs/tutorials/dates.html

//El calendario puede devolver una fecha desde el front y si nosotros en cuanto a esa fecha abordarlo con los turnos.
//Si a ellos les sirve recibir un arreglo con los horarios.
