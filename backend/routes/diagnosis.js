const router = require('express').Router();
let Diagnosis = require('../models/diagnosis.model');

router.route('/:appointmentId').get((req, res) => {
    Diagnosis.findOne({appointmentId: req.params.appointmentId}).populate('appointmentId').populate('patient').populate('doctor')
        .then(diagnosis => res.json(diagnosis))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const status = req.body.status;
    const appointmentId = req.body.appointmentId;
    const lastUpdate = Date.parse(req.body.lastUpdate);
    const doctor = req.body.doctorId;
    const patient = req.body.patienttId;
    const diagnosisName = req.body.diagnosisName;
    const diagnosisCode = req.body.diagnosisCode;
    const diagnosisSyatem = req.body.diagnosisSyatem;

    const newDiagnosis = new Diagnosis({
        status,
        appointmentId,
        lastUpdate,
        doctor,
        patient,
        diagnosisName,
        diagnosisCode,
        diagnosisSyatem,
    });

    newDiagnosis.save()
        .then(() => res.json('newDiagnosis added!'))
        .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;