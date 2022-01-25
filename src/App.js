import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component"
import SearchPatient from "./components/search-patient.component";
import ShowPatient from "./components/show-patient.component";
import ViewAppointment from "./components/view-appointment.component";
import PatientFeedback from "./components/patient-feedback.component";
// import BookAppointment from "./components/book-appointment.component";

import './App.css';

function App() {
  return (    
    <Router>
    <div className="container">
      <Navbar />
      <Route path="/" exact component={SearchPatient} />
      <Route path="/details/:phone" component={ShowPatient} />
      <Route path="/appointment/:patient" component={ViewAppointment} />
      <Route path="/feedback/:Id" component={PatientFeedback} />
      {/* <Route path="/bookappointments/:patientId" component={BookAppointment} /> */}
    </div>
    </Router>
  );
}

export default App;