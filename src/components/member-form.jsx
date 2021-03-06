import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import FinalForm from "./final-form";
import ThankYou from "./thank-you";

class MemberForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        first: "",
        last: "",
        sex: "",
        birthdate: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "CA",
        zip: "",
        find: "",
        rec: "",
        recWeb: "",
        // id: "",
        // recImg: "",
        // selfie: "",
        instructions: "",
        condition: ""
      },
      errors: {},
      submissionStatus: "edit"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Form Submit Success
  doSubmit = () => {
    console.log("starting doSubmit()");
    // let birthdate = moment(this.state.data["birthdate"], "MMDDYYYY").format(
    //   "YYYY-MM-DD"
    // );
    const data = { ...this.state.data };
    // data["birthdate"] = birthdate;
    const newData = JSON.stringify(data);
    console.log(newData);
    fetch("http://localhost:5000/submit", {
      method: "POST",
      body: newData,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(response => {
      console.log(response);
    });
  };
  changeMode = () => {
    this.setState({ submissionStatus: "edit" });
  };
  handleFinalSubmit = () => {
    this.setState({ submissionStatus: "submitted" });
    this.doSubmit();
  };
  //Form Validation Schema
  schema = {
    first: Joi.string()
      .alphanum()
      .min(1)
      .max(30)
      .required()
      .label("First"),
    last: Joi.string()
      .min(1)
      .max(30)
      .required()
      .label("Last"),
    sex: Joi.string()
      .min(1)
      .max(10)
      .required()
      .label("Gender"),
    birthdate: Joi.date()
      .required()
      .label("Birthdate"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    phone: Joi.number()
      .required()
      .label("Phone"),
    street: Joi.string()
      .min(5)
      .max(35)
      .required()
      .label("Street"),
    city: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("City"),
    state: Joi.string()
      .min(2)
      .max(2)
      .required(),
    zip: Joi.number()
      .integer()
      .positive()
      .required()
      .label("Zip/Postal"),
    rec: Joi.string()
      .alphanum()
      .min(1)
      .max(40)
      .required()
      .label("Recommendation ID"),
    recWeb: Joi.string()
      .min(7)
      .max(40)
      .required()
      .label("Recommendation Website"),
    instructions: Joi.string(),
    condition: Joi.string(),
    id: Joi.required().label("ID"),
    recImg: Joi.required().label("Recommendation Image"),
    selfie: Joi.required().label("Selfie"),
    find: Joi.string()
  };

  render() {
    const { find } = this.state.data;

    if (this.state.submissionStatus === "edit") {
      return (
        <React.Fragment>
          <form
            style={{ backgroundColor: "ghostwhite", padding: "20px" }}
            onSubmit={this.handleSubmit}
          >
            <p style={{ fontSize: "42px" }} className="m-3">
              <b>Become A Member!</b>
            </p>
            <span style={{ float: "right" }}>
              Key: * = Required Input Field
            </span>
            <br />
            <hr style={{ marginTop: "2rem" }} />
            <h3>User Info</h3>
            <div className="form-group m-2">
              <div className="row">
                <div className="col-6">
                  {this.renderInput("first", "First", "text")}
                </div>
                <div className="col-6">
                  {this.renderInput("last", "Last", "text")}
                </div>
              </div>
            </div>
            <div className="form-group m-2">
              <div className="form-check">
                <input
                  onChange={this.handleChange}
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  id="exampleRadios1"
                  value="Male"
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={this.handleChange}
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  id="exampleRadios2"
                  value="Female"
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  onChange={this.handleChange}
                  className="form-check-input"
                  type="radio"
                  name="sex"
                  id="exampleRadios3"
                  value="Other"
                />
                <label className="form-check-label" htmlFor="exampleRadios3">
                  Other
                </label>
              </div>
            </div>
            <div className="form-group m-2">
              <div className="row">
                <div className="col-8">
                  {this.renderInput("birthdate", "Birthdate", "date")}
                </div>
              </div>
            </div>
            <div className="form-group m-2">
              <h3>Contact Info</h3>
              <div className="row">
                <div className="col-5">
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  {this.renderInput("email", "Email", "email")}
                </div>
              </div>
            </div>
            <div className="form-group m-2">
              <div className="row">
                <div className="col-8">
                  {this.renderInput("phone", "Contact Number", "tel")}
                </div>
              </div>
            </div>
            <div className="form-group m-2">
              <h3>Delivery Address</h3>
              <div className="row">
                <div className="col-5">
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  {this.renderInput("street", "Street Address", "text")}
                </div>
              </div>

              <div className="row">
                <div className="col-7">
                  {this.renderInput("city", "City", "text")}
                </div>
                <div className="col-5">
                  <label htmlFor="state">State</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    id="state"
                    value="CA"
                    readOnly="readonly"
                    placeholder="CA"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-7">
                  {this.renderInput("zip", "Zip/Postal-Code", "number")}
                </div>
              </div>
            </div>

            <div className="form-group m-2">
              <h3>Doctors Recommendation</h3>
              <div className="row">
                <div className="col-7">
                  {this.renderInput("rec", "Recommendation ID#", "text")}
                </div>
              </div>
              <div className="row">
                <div className="col-7">
                  {this.renderInput("recWeb", "Rec Website", "url")}
                </div>
              </div>
            </div>
            <div className="form-group m-2">
              <h3>
                Upload CA ID
                <span style={{ fontSize: "20px" }}>
                  (Passport or CA License) *
                </span>
              </h3>

              <div className="row m-1">
                <div className="col-7">
                  <input
                    onChange={this.handleChange}
                    name="id"
                    type="file"
                    error={this.state.errors["selfie"]}
                    // value={this.state.data["id"]}
                  />
                </div>
              </div>
              {this.state.errors["id"] && (
                <div className="alert alert-danger">
                  {this.state.errors["id"]}
                </div>
              )}
            </div>
            <div className="form-group m-1">
              <h3>Upload Dr.Recommendation *</h3>
              <div className="row m-1">
                <div className="col-7">
                  <input
                    onChange={this.handleChange}
                    name="recImg"
                    type="file"
                    error={this.state.errors["selfie"]}
                    // value={this.state.data["recImg"]}
                  />
                </div>
              </div>
              {this.state.errors["recImg"] && (
                <div className="alert alert-danger">
                  {this.state.errors["recImg"]}
                </div>
              )}
            </div>
            <div className="form-group m-1">
              <h3>
                Upload Selfie
                <span style={{ fontSize: "20px" }}>
                  (Clear Photo of Yourself) *
                </span>
              </h3>
              <div className="row m-1">
                <div className="col-7">
                  <input
                    onChange={this.handleChange}
                    name="selfie"
                    error={this.state.errors["selfie"]}
                    type="file"
                    // value={this.state.data["selfie"]}
                  />
                </div>
              </div>
              {this.state.errors["selfie"] && (
                <div className="alert alert-danger">
                  {this.state.errors["selfie"]}
                </div>
              )}
            </div>

            <div className="form-group m-2">
              <h3>Special Driving Instructions </h3>
              <span style={{ fontSize: "15px" }}>
                (Parking, Gate Code, Meeting Your Driver, etc...)
              </span>
              <div className="row">
                <div className="col-10">
                  <textarea
                    name="instructions"
                    cols="10"
                    rows="5"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group m-2">
              <h3>Medical Condition</h3>
              <span style={{ fontSize: "15px" }}>
                (Not required, but it helps us better serve you!)
              </span>
              <div className="row">
                <div className="col-10">
                  <textarea
                    name="condition"
                    cols="10"
                    rows="5"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group m-2">
              <div className="row">
                <div className="col-8">
                  <label htmlFor="recommendation">How Did You find Us?</label>
                  <select
                    onChange={this.handleChange}
                    className="form-control"
                    value={find}
                    id="recommendation"
                    name="find"
                  >
                    <option value="" />
                    <option value="friend">Friend Referral</option>
                    <option value="google">Google.com</option>
                    <option value="yelp">Yelp.com</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            {this.renderButton("Submit")}
          </form>
        </React.Fragment>
      );
    } else if (this.state.submissionStatus === "confirm") {
      return (
        <FinalForm
          handleSubmit={this.handleFinalSubmit}
          handleEdit={this.changeMode}
          changeMode={this.changeMode}
          data={this.state.data}
        />
      );
    } else if (this.state.submissionStatus === "submitted") {
      return <ThankYou />;
    }
  }
}

export default MemberForm;
