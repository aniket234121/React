import React from "react";
import Input from "./Input";
import useInput from "./useInput";

const Form = () => {
  // ✅ Email Validation (still same)
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => value.includes("@"));

  // ✅ Password Validation using Anonymous Function
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => value.trim().length >= 6); // 👈 anonymous arrow function

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailHasError || passwordHasError) {
      console.log("Form invalid!");
      return;
    }
    console.log("Form Submitted:", {
      email: emailValue,
      password: passwordValue,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        value={emailValue}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        error={emailHasError && "Please enter a valid email"}
      />

      <Input
        label="Password"
        id="password"
        type="password"
        name="password"
        value={passwordValue}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        error={passwordHasError && "Password must be at least 6 characters"}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
