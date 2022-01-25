const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const patientSchema = new Schema({
    fullName: { type: String, required: true, trim: true },
    givenName: { type: String, required: true, trim: true },
    familyName: { type: String, required: true, trim: true },
    phone: {type: Number, required: true, unique: true, minlength: 10, maxlength: 10},
    phonetype: {type: String },
    email: { type: String, trim: true, lowercase: true, unique: true, required: 'Email address is required', validate: [validateEmail, 'Please fill a valid email address'] },
    emailtype: {type: String },
    gender: { type: String, required: true,  enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date, required: true },
    address: { houseNumber: String, street: String, city: String, state: String, zip: String },
    addressType: { type: String, required: true, trim: true }
},{
    timestamps: true
});

const Patient = mongoose.model('Patient',patientSchema )
module.exports = Patient;