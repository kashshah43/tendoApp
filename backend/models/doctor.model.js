const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    givenName: { type: String, required: true, trim: true },
    familyName: { type: String, required: true, trim: true },
    phone: { type: Number, required: true }
},{
    timestamps: true
});

const Doctor = mongoose.model('Doctor',doctorSchema )
module.exports = Doctor;