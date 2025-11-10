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
