import React, { Component } from "react";

class FinalForm extends Component {
  state = { data: this.props.data };

  render() {
    const {
      first,
      last,
      sex,
      birthdate,
      email,
      phone,
      street,
      city,
      state,
      zip,
      rec,
      recWeb,
      instructions,
      condition
    } = this.state.data;
    return (
      <div className="jumbotron">
        <h2>Is all this info correct?</h2>
        <h3>First Name: {first}</h3>
        <h3>Last Name: {last}</h3>
        <h3>Sex: {sex}</h3>
        <h3>Birthdate: {birthdate}</h3>
        <h3>Email {email}</h3>
        <h3>Contact Number: {phone}</h3>
        <h3>Street: {street}</h3>
        <h3>City: {city}</h3>
        <h3>State: {state}</h3>
        <h3>
          Zip/Postal
          {zip}
        </h3>
        <h3>Recommendation ID: {rec}</h3>
        <h3>Recommendation Website: {recWeb}</h3>
        <h3>Special Driving Instructions: {instructions}</h3>
        <h3>Medical Condition: {condition}</h3>
        <hr />
        <h3>
          If all this info is true click the 'Submit' button below. Otherwise
          click the 'Edit' button
        </h3>
        <button
          type="button"
          onClick={this.props.handleEdit}
          className="btn btn-primary btn-info"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={this.props.handleSubmit}
          className="btn btn-primary btn-large m-2"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default FinalForm;
