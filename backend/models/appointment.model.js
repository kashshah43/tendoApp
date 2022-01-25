const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    type: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    appointmentStart: { type: Date },
    appointmentEnd: { type: Date },
    followUp: { type: Boolean, default: false }
},{
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema )
module.exports = Appointment;