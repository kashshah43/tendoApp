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
        axios.get('http://localhost:5000/patient/'+this.props.match.params.phone)
        .then(res => {
            if(!res.data) {
                window.location = '/';
            }
            else {
                this.setState({ 
                    Id: res.data._id,
                    fullName: res.data.fullName,
                    givenName: res.data.givenName,
                    familyName: res.data.familyName,
                    phone: res.data.phone,
                    phonetype: res.data.phonetype,
                    email: res.data.email,
                    emailtype: res.data.emailtype,
                    gender: res.data.gender,
                    dateOfBirth: res.data.dateOfBirth,
                    address: res.data.address,
                    addressType: res.data.addressType
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <div className="main-container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h3>Patient Details</h3>
                            </div>
                            <div className="card-body">
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
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-2 centerAlign">
                                        <Link className="btn btn-info" to={"/appointment/"+this.state.Id}>View Appointments</Link> 
                                    </div>
                                    <div className="col-2 centerAlign">
                                        <Link className="btn btn-primary" to={"/bookappointment/"+this.state.Id}>Book Appointments</Link>   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}