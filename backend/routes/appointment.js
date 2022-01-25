const router = require('express').Router();
let Appointment = require('../models/appointment.model');

router.route('/:patientId').get((req, res) => {
    Appointment.findOne({patient: req.params.patientId}).populate('doctor').populate('patient')
        .then(appointments => res.json(appointments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const type = req.body.type;
    const status = req.body.status;
    const patientId = req.body.patientId;
    const doctorId = req.body.doctorId;
    const appointmentStart = Date.parse(req.body.appointmentStart);
    const appointmentEnd = Date.parse(req.body.appointmentEnd);
    const followUp = req.body.followUp;

    const newAppointment = new Appointment({
        type,
        status,
        patientId,
        doctorId,
        appointmentStart,
        appointmentEnd,
        followUp
    });

    newAppointment.save()
        .then(() => res.json('newAppointment added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;