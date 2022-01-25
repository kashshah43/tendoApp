const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    diagnosis: { type: Schema.Types.ObjectId, ref: 'Diagnosis' },
    rateDoctor: { type: String },
    feedbackValue: { type: String },
    setDiagnos: { type: String }
},{
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema )
module.exports = Feedback;