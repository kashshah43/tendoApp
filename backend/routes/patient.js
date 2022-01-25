const router = require('express').Router();
let Patient = require('../models/patient.model');

router.route('/').get((req, res) => {
    Patient.find()
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:phone').get((req, res) => {
    Patient.findOne({phone: req.params.phone})
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log(req.body);
    const fullName = req.body.fullName;
    const givenName = req.body.givenName;
    const familyName = req.body.familyName;
    const phone = Number(req.body.phone);
    const phonetype = req.body.phonetype;
    const email = req.body.email;
    const emailtype = req.body.emailtype;
    const gender = req.body.gender;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const houseNumber = req.body.houseNumber;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const addressType = req.body.addressType;

    const newPatient = new Patient({
        fullName,
        givenName,
        familyName,
        phone,
        phonetype,
        email,
        emailtype,
        gender,
        dateOfBirth,
        address: {houseNumber, street, city, state, zip },
        addressType,
    });

    newPatient.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;