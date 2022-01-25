import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class SearchPatient extends Component {
    constructor(props) {
        super(props);
        this.onChangePhone = this.onChangePhone.bind(this);

        this.state = {
            phone: ''
        }
    }

    onChangePhone(e) {
        console.log(e.target.value);
        this.setState({
            phone: e.target.value
        });
    }

    render() {
        return (
            <div className="main-container">
                <form className="customForm" onSubmit={this.onSubmit}>
                    <div className="form-group centerAlign">
                        <input 
                            type="tel"
                            className="search"
                            placeholder="Phone Number"
                            maxLength="10"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group centerAlign">
                        <Link className="submitBtn" to={"/details/"+this.state.phone}>Login</Link> 
                    </div>
                </form>
            </div>
        )
    }
}