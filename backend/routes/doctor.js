const router = require('express').Router();
let Doctor = require('../models/doctor.model');

router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const familyName = req.body.familyName;
    const givenName = req.body.givenName;
    const phone = Number(req.body.phone);

    const newDoctor = new Doctor({
        familyName,
        givenName,
        phone
    });

    newDoctor.save()
        .then(() => res.json('Doctor added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;