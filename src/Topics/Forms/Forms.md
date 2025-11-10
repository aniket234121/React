# Forms in React

- how react handles Form data Controlled components (useState) and uncontrolled components (useRef)
- prevent default form submission
- handling multiple input fields using state storing in objects
- handling form using FormData
- form resetting
- form validation

A form in React is similar to an HTML form but React controls the data flow using state instead of letting the DOM handle it directly.

## Controlled Components

A controlled component is one where the form data is handled by the React state.

- Input value is bound to state (value={name}).
- Each keystroke triggers onChange, updating state.
- State is the single source of truth.

```javascript
import React from "react";
import { useState } from "react";

const FormUsingState = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent form submission
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
    //  handle form reset on forms with states
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
```

## Uncontrolled Components

Uncontrolled components don’t store data in React state; instead, you use a ref to access DOM values directly.

- Data is read using ref, not state.
- Simpler for small cases, but less React-like.
- Doesn’t re-render on every change.

```javascript
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
    emailRef.current.value = "";
    nameRef.current.value = "";
    messageRef.current.value = "";
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
      <button type="button" onClick={handleFormReset}>
        reset
      </button>

      <button type="submit">submit</button>
    </form>
  );
};

export default FormUsingRef;
```

## FormData API

Usually in React, we use controlled inputs with useState to manage form data.
But sometimes, for simple forms, or when you don’t need real-time validation or state updates, you can use the native FormData API instead.

FormData is a built-in JavaScript interface that provides an easy way to construct key/value pairs representing form fields and their values.

In React, you can use it to read all form values at once directly from the event target (event.target).

syntax:-

    const formData = new FormData(event.target);

### Accessing form data

| Method                      | Description                                                   | Example                         |
| --------------------------- | ------------------------------------------------------------- | ------------------------------- |
| `formData.get("name")`      | Returns the first value for a field                           | `formData.get("name")`          |
| `formData.getAll("gender")` | Returns **all values** for that field (for checkboxes/radios) | `formData.getAll("gender")`     |
| `formData.entries()`        | Returns an iterator of key/value pairs                        | Use with `Object.fromEntries()` |

FormData Example

```javascript
import React from "react";

const FormUsingFormData = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");

    console.log(name);

    const gender = formData.getAll("gender");
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    console.log(gender);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="name">Name:</label>
      <br />
      <input type="text" id="name" name="name" placeholder="Enter your name" />
      <br />
      <br />

      <p>Gender:</p>
      <input type="radio" id="male" name="gender" value="Male" required />
      <label htmlFor="male">Male</label>
      <br />

      <input type="radio" id="female" name="gender" value="Female" />
      <label htmlFor="female">Female</label>
      <br />

      <input type="radio" id="other" name="gender" value="Other" />
      <label htmlFor="other">Other</label>
      <br />
      <br />

      <p>Experience Level:</p>
      <input type="radio" id="beginner" name="experience" value="Beginner" />
      <label htmlFor="beginner">Beginner</label>
      <br />

      <input
        type="radio"
        id="intermediate"
        name="experience"
        value="Intermediate"
      />
      <label htmlFor="intermediate">Intermediate</label>
      <br />

      <input type="radio" id="advanced" name="experience" value="Advanced" />
      <label htmlFor="advanced">Advanced</label>
      <br />
      <br />
      <input type="reset" value="reset" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormUsingFormData;
```

## Handling Forms Validation

### 1. Inline Validation (Real-time Validation)

➡️ What it is:
Validation happens while the user types or when an input loses focus (onChange or onBlur events).

👉 Use for: Quick feedback and better user experience.

---

### 2. On-Submit Validation

➡️ What it is:
Validation happens only when the user submits the form.
If validation fails, submission is stopped.

👉 Use for: Small or simple forms where real-time feedback isn’t critical.

---

### 3. Third-Party Library Validation

➡️ What it is:
Use external libraries like react-hook-form, Formik, or Yup to handle validation automatically.

👉 Use for:
Large forms, reusable validation logic, and better performance.

### 4. Browser built in attributes for validation

| Attribute                 | Purpose                                  | Example                                    |
| ------------------------- | ---------------------------------------- | ------------------------------------------ |
| `required`                | Field must not be empty                  | `<input required />`                       |
| `minlength` / `maxlength` | Limit text length                        | `<input minlength="3" />`                  |
| `pattern`                 | Match a regex pattern                    | `<input pattern="[A-Za-z]{3,}" />`         |
| `type`                    | Enforce format (`email`, `number`, etc.) | `<input type="email" />`                   |
| `min` / `max`             | Set numeric limits                       | `<input type="number" min="1" max="10" />` |
| `step`                    | Specify valid numeric steps              | `<input type="number" step="2" />`         |

## Building and Using Reusable Input Components

```javascript
import React from "react";

const Input = ({ id, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
};

export default Input;

const FormExample = () => {
  return (
    <div>
      <Input label={"email"} id={"email"} type={"email"} name={"email"}></Input>
      <Input
        label={"password"}
        id={"password"}
        type={"password"}
        name={"password"}
      ></Input>
    </div>
  );
};
```
### Outsourcing Validation Logic 
we can outsource validation logic by using another util.js which will have all the validation logic written in function and using them in the form validation

### Using Custom useInput HOOK

