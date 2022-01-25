const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
    status: { type: String, required: true, trim: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    lastUpdate: { type: Date },
    diagnosisName: { type: String, required: true },
    diagnosisCode: { type: String, required: true },
    diagnosisSyatem: { type: String, required: true }
},{
    timestamps: true
});

const Diagnosis = mongoose.model('Diagnosis',diagnosisSchema )
module.exports = Diagnosis;