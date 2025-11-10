import React from "react";
import { useState } from "react";

const FormUsingState = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  const handleInputChange = (identifier, event) => {
    setFormValues((preValues) => {
      return {
        ...preValues,
        [identifier]: event.target.value,
      };
    });
  };
  const handleFormReset = () => {
    setFormValues(() => ({
      email: "",
      name: "",
      message: "",
    }));
  };

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formValues.name}
        onChange={(event) => handleInputChange("name", event)}
      />
      <br />
      <br />

      <label htmlFor="email">Email:</label>
      <br />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formValues.email}
        onChange={(event) => handleInputChange("email", event)}
      />
      <br />
      <br />

      <label htmlFor="message">Message:</label>
      <br />
      <textarea
        id="message"
        name="message"
        rows="4"
        cols="30"
        placeholder="Type your message"
        value={formValues.message}
        onChange={(event) => handleInputChange("message", event)}
      ></textarea>
      <br />
      <br />
      <button type="button" onClick={handleFormReset}>
        reset
      </button>

      <button type="submit">submit</button>
    </form>
  );
};

export default FormUsingState;
