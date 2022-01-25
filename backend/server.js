const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
// , useCreateIndex: true

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DB connected successfully");
})

const patientRouter = require('./routes/patient');
const doctorRouter = require('./routes/doctor');
const appointmentRouter = require('./routes/appointment');
const diagnosisRouter = require('./routes/diagnosis');
const feedbackRouter = require('./routes/feedback');

app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/appointment', appointmentRouter);
app.use('/diagnosis', diagnosisRouter);
app.use('/feedback', feedbackRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});