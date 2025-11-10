import React from "react";
import { useRef } from "react";
const FormUsingRef = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(emailRef.current.value);
    console.log(nameRef.current.value);
    console.log(messageRef.current.value);
  };

  const handleFormReset = () => {

    emailRef.current.value=''
    nameRef.current.value=''
    messageRef.current.value=''

  };
  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <label htmlFor="name">Name:</label>
      <br />
      <input
        ref={nameRef}
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
      />
      <br />
      <br />

      <label htmlFor="email">Email:</label>
      <br />
      <input
        ref={emailRef}
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
      />
      <br />
      <br />

      <label htmlFor="message">Message:</label>
      <br />
      <textarea
        ref={messageRef}
        id="message"
        name="message"
        rows="4"
        cols="30"
        placeholder="Type your message"
      ></textarea>
      <br />
      <br />
      <button type="button" onClick={handleFormReset}>reset</button>

      <button type="submit">submit</button>
    </form>
  );
};

export default FormUsingRef;
