import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

export default class ViewAppointment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Id: '',
            type: '',
            status: '',
            patientId: '',
            doctorId: '',
            appointmentStart: '',
            appointmentEnd: '',
            followUp: '',
            dId: '',
            dstatus: '',
            diagnosisName:'',
            diagnosisCode:'',
            diagnosisSyatem:'',
            lastUpdate: '',
            feedbackCompleted: false
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.patient);
        axios.get('http://localhost:5000/appointment/'+this.props.match.params.patient)
        .then(res => {
            console.log(res.data);
            this.setState({ 
                Id: res.data._id,
                type: res.data.type,
                status: res.data.status,
                patientId: res.data.patient.fullName,
                doctorId: res.data.doctor.givenName,
                appointmentStart: res.data.appointmentStart,
                appointmentEnd: res.data.appointmentEnd,
                followUp: res.data.followUp,
            })
            axios.get('http://localhost:5000/diagnosis/'+res.data._id)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    dId: resp.data._id,
                    dstatus: resp.data.status,
                    diagnosisName: resp.data.diagnosisName,
                    diagnosisCode: resp.data.diagnosisCode,
                    diagnosisSyatem: resp.data.diagnosisSyatem,
                    lastUpdate: resp.data.lastUpdate
                })
                axios.get('http://localhost:5000/feedback/'+res.data._id)
                .then(response => {
                    console.log(response.data);
                    if(response.data) {
                        this.setState({
                            fId: response.data._id,
                            rateDoctor: response.data.rateDoctor,
                            setDiagnos: response.data.setDiagnos,
                            feedbackValue: response.data.feedbackValue,
                            feedbackCompleted: true
                        })
                    }
                    else {
                        this.setState({
                            feedbackCompleted: false
                        })
                    }
                })
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="main-container patientContainer">
                <h3>Appointments</h3>
                <div className="patientDisplayClass">
                    <b>Type: </b> {this.state.type}
                </div>
                <div className="patientDisplayClass">
                    <b>Status: </b> {this.state.status}
                </div>
                <div className="patientDisplayClass">
                    <b>Patient Name: </b> {this.state.patientId}
                </div>
                <div className="patientDisplayClass">
                    <b>Doctor Name: </b> {this.state.doctorId}
                </div>
                <div className="patientDisplayClass">
                    <b>AppointmentStart: </b> {this.state.appointmentStart}
                </div>
                <div className="patientDisplayClass">
                    <b>AppointmentEnd: </b> {this.state.appointmentEnd}
                </div>
                <div className="patientDisplayClass">
                    <b>FollowUp: </b> {this.state.followUp}
                </div>
                <br/>
                <br/>
                <h3>Diagnosis</h3>
                <div className="patientDisplayClass">
                    <b>Status: </b> {this.state.dstatus}
                </div>
                <div className="patientDisplayClass">
                    <b>Diagnosis Name: </b> {this.state.diagnosisName}
                </div>
                <div className="patientDisplayClass">
                    <b>Diagnosis Code: </b> {this.state.diagnosisCode}
                </div>
                <div className="patientDisplayClass">
                    <b>Diagnosis Syatem: </b> {this.state.diagnosisSyatem}
                </div>
                <div className="patientDisplayClass">
                    <b>LastUpdate: </b> {this.state.lastUpdate}
                </div>
                <br/>
                <br/>
                <h3>Feedback</h3>
                { this.state.feedbackCompleted &&
                    <div className="patientDisplayClass">
                        Hi <b>{this.state.patientId}</b>, on a scale of 1-10, would you recommend 
                        <b> {this.state.doctorId}</b> to a friend or family member?
                        <br/>
                        - {this.state.rateDoctor}
                    </div>
                }
                { this.state.feedbackCompleted &&
                    <div className="patientDisplayClass">
                        Thank you. You were diagnosed with <b>{this.state.diagnosisName}</b>. Did <b> {this.state.doctorId}</b>
                        explain how to manage this diagnosis in a way you could understand?
                        <br/>
                        - {this.state.setDiagnos}
                    </div>
                }
                { this.state.feedbackCompleted &&
                    <div className="patientDisplayClass">
                        We appreciate the feedback, one last question: how do you feel about being diagnosed
                        with <b>{this.state.diagnosisName}</b>?
                        <br/>
                        - {this.state.feedbackValue}
                    </div>
                }
                { !this.state.feedbackCompleted &&
                    <div>
                        <Link className="submitBtn" to={"/feedback/"+this.state.Id}>Feedback</Link> 
                    </div>
                }
            </div>
        )
    }
}