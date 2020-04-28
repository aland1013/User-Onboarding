import React from 'react';

const Form = () => {
  return (
    <form>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Password
        <input type="text" name="password" />
      </label>
      <label>
        <input type="checkbox" name="terms" checked={true} />
        Terms & Conditions
      </label>
      <button type="submit">submit</button>
    </form>
  );
}

export default Form;