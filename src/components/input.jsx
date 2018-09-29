import React from "react";

const Input = ({ id, error, value, handleChange, type, name }) => {
  return (
    <React.Fragment>
      <label htmlFor={id}>{id}*</label>
      <input
        onChange={handleChange}
        name={name}
        error={error}
        type={type}
        value={value}
        id={id}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
