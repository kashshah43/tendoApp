import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class SearchPatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: '',
            fullName: '',
            givenName: '',
            familyName: '',
            phone: '',
            phonetype: '',
            email: '',
            emailtype: '',
            gender: '',
            dateOfBirth: '',
            address: '',
            addressType: '', 
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/patient/', this.props.match.params.phone)
        .then(res => {
            this.setState({ 
                Id: res.data[0]._id,
                fullName: res.data[0].fullName,
                givenName: res.data[0].givenName,
                familyName: res.data[0].familyName,
                phone: res.data[0].phone,
                phonetype: res.data[0].phonetype,
                email: res.data[0].email,
                emailtype: res.data[0].emailtype,
                gender: res.data[0].gender,
                dateOfBirth: res.data[0].dateOfBirth,
                address: res.data[0].address,
                addressType: res.data[0].addressType
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="main-container patientContainer">
                <h3>Patient Details</h3>
                <div className="patientDisplayClass">
                    <b>Given Name:</b> {this.state.givenName}
                </div>
                <div className="patientDisplayClass">
                    <b>Family Name:</b> {this.state.familyName}
                </div>
                <div className="patientDisplayClass">
                    <b>Phone:</b><label>({this.state.phonetype})</label> {this.state.phone}
                </div>
                <div className="patientDisplayClass">
                    <b>Email:</b><label>({this.state.emailtype})</label> {this.state.email}
                </div>
                <div className="patientDisplayClass">
                    <b>Gender:</b> {this.state.gender}
                </div>
                <div className="patientDisplayClass">
                    <b>Date Of Birth:</b> {this.state.dateOfBirth}
                </div>
                <div className="patientDisplayClass">
                    <b>Address:</b><label>({this.state.addressType})</label> {this.state.address.street}, 
                                    {this.state.address.houseNumber}, 
                                    {this.state.address.city}, 
                                    {this.state.address.state}, 
                                    {this.state.address.zip}
                </div>
                <br/>
                <br/>
                <div>
                    <Link className="submitBtn" to={"/appointment/"+this.state.Id}>View Appointments</Link> 
                    <Link className="submitBtn" to={"/bookappointment/"+this.state.Id}>Book Appointments</Link> 
                </div>
            </div>
        )
    }
}