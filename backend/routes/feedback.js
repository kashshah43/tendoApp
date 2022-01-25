const router = require('express').Router();
let Feedback = require('../models/feedback.model');

router.route('/:appointmentId').get((req, res) => {
    Feedback.findOne({appointment: req.params.appointmentId}).populate('appointment').populate('doctor').populate('patient').populate('diagnosis')
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const appointment = req.body.appointmentId;
    const diagnosis = req.body.diagnosisId;
    const patient = req.body.patientId;
    const doctor = req.body.doctorId;
    const rateDoctor = req.body.rateDoctor;
    const feedbackValue = req.body.feedbackValue;
    const setDiagnos = req.body.setDiagnos;

    const newFeedback = new Feedback({
        appointment,
        diagnosis,
        patient,
        doctor,
        rateDoctor,
        feedbackValue,
        setDiagnos
    });

    newFeedback.save()
        .then(() => res.json('newFeedback added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;