const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    day: {
        type: String,
        required: true,
        enum: ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes','sabado'],  
    },
    hour: {
        type: String,
        required: true,
        enum: ["08:00","08:15","08:30","08:45","09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45"]
        // Esto se puede resolver desde el controller con el metodo aggregate() { $project } --> https://www.mongodb.com/docs/manual/reference/operator/aggregation/hour/
    },
    branchOffice: {
        type: mongoose.Types.ObjectId,
        ref: 'branchOfficeSchema', //A chequear el nombre real
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    available: {
        type: Boolean,
        default: true,
        required: true,
    },
    attendance: {
        type: String,
        required: true,
        enum: ['pendiente de pago', 'confirmado', 'cancelado por cliente', 'cancelado por sucursal', 'finalizado']
    },
    // create_date: {
    //     type: ,
    //     require: ,
    // },{ timestamps: true },
    //Box ?
});

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