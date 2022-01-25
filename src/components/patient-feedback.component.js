import React, { Component } from "react";
import axios from "axios";

export default class PatientFeedback extends Component {
    constructor(props) {
        super(props);
        this.slideRangeChange = this.slideRangeChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onUserInput = this.onUserInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            patientId: '',
            doctorId: '',
            appointmentId: '',
            diagnosisId: '',
            rateDoctor: '1',
            feedbackValue: '',
            setDignos: ''
        }
    }

    slideRangeChange(e) {
        console.log(e);
        this.setState({
            rateDoctor: e.target.value
        })
    }

    onRadioChange(e) {
        console.log(e);
        this.setState({
            setDignos: e.target.value
        })
    }

    onUserInput(e) {
        console.log(e);
        this.setState({
            feedbackValue: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const feedback = {
            patientId: this.state.patientId,
            doctorId: this.state.doctorId,
            appointmentId: this.state.appointmentId,
            diagnosisId: this.state.diagnosisId,
            rateDoctor: this.state.rateDoctor,
            feedbackValue: this.state.feedbackValue,
            setDiagnos: this.state.setDignos
        }
        console.log(feedback);

        axios.post('http://localhost:5000/feedback/add/', feedback)
        .then(res => {
            console.log(res.data);
            window.location = '/appointment/'+this.state.patientId;
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/diagnosis/'+this.props.match.params.Id)
        .then(res => {
            this.setState({ 
                patientId: res.data.patient._id,
                patientName: res.data.patient.fullName,
                doctorId: res.data.doctor._id,
                doctorName: res.data.doctor.familyName,
                diagnosedWith: res.data.diagnosisName,
                appointmentId: res.data.appointmentId._id,
                diagnosisId: res.data._id
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="main-container">
                <h3>
                    {/* {this.state.patient.givenName} */}
                    Please give us your valuable feedback to improve your experience.
                </h3>
                <form className="customForm" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label className="QuestionTitle">
                            Hi <b>{this.state.patientName}</b>, on a scale of 1-10, would you recommend <b>Dr. {this.state.doctorName}</b> to a friend or family member?
                        </label>
                        <input 
                            className="form-range"
                            id="typeinp" 
                            type="range" 
                            min="0" 
                            max="10" 
                            value={this.state.rateDoctor} 
                            onChange={this.slideRangeChange}
                            step="1"
                            required
                        />
                        <div><b>1 = Would not recommend, 10 = Would strongly recommend</b></div>
                        Your Rating: <b>{this.state.rateDoctor}</b>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label className="form-label">
                            Thank you. You were diagnosed with <b>{this.state.dignosedWith}</b>. Did <b>Dr. {this.state.doctorName}</b> explain how to manage this diagnosis in a way you could understand?
                        </label>

                        <div className="form-check">
                            <input className="form-check-input"  value="Yes" checked={this.state.setDignos === "Yes"} type="radio" name="setDignos" onChange={this.onRadioChange} required />
                            <label className="form-check-label">
                                Yes
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"  value="No" checked={this.state.setDignos === "No"} type="radio" name="setDignos" onChange={this.onRadioChange}  required/>
                            <label className="form-check-label">
                                No
                            </label>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label className="form-label" id="feedback">
                            We appreciate the feedback, one last question: how do you feel about being diagnosed with <b>{this.state.dignosedWith}</b>?
                        </label>
                        <input 
                            className="form-control" 
                            type="text" 
                            value={this.state.feedbackValue} 
                            onChange={this.onUserInput}
                            aria-label="Please give us your feedback on your diagnosis"
                            aria-describedby="feedback"
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Submit Feedback" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}