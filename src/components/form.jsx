import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  changeValidate = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = event => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const target = event.currentTarget.name;
    data[target] = event.currentTarget.value;
    const error = this.changeValidate(event.currentTarget);
    errors[target] = error;
    this.setState({ data, errors });
    console.log(this.state.data);
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!result.error) return null;
    const { details } = result.error;
    const errors = {};
    details.map(e => {
      errors[e.path] = e.message;
    });
    return Object.keys(errors).length === 0 ? null : errors;
  };
  handleSubmit = event => {
    console.log("ok");
    event.preventDefault();
    console.log("ok");
    const errors = this.validate();
    console.log("ok");
    this.setState({ errors: errors || {} });
    console.log("ok");
    console.log(errors);
    if (errors) return;
    console.log("ok");

    this.doSubmit();
  };
  renderButton(label) {
    return (
      <button
        className="btn btn-info btn-lg m-2"
        type="submit"
        // disabled={this.validate()}
      >
        {label}
      </button>
    );
  }

  renderInput = (name, id, type) => {
    return (
      <Input
        handleChange={this.handleChange}
        type={type}
        id={id}
        name={name}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        className="form-control"
      />
    );
  };
}

export default Form;
