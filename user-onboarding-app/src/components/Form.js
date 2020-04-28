import React, {useState, useEffect } from 'react';

const Form = () => {
  const [formState, setFormState ] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const inputChange = (e) => {
    console.log('input changed', e.target.value);
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    };
    setFormState(newFormData);
  }

  return (
    <form>
      <label htmlFor="name">
        Name
        <input 
          type="text" 
          name="name" 
          id="name"
          onChange={inputChange}
          value={formState.name} 
        />
      </label>
      <label htmlFor="email">
        Email
        <input 
          type="email" 
          name="email" 
          id="email"
          onChange={inputChange}
          value={formState.email} 
        />
      </label>
      <label htmlFor="password">
        Password
        <input 
          type="text" 
          name="password" 
          id="password" 
          onChange={inputChange}
          value={formState.password}
        />
      </label>
      <label name="terms">
        <input 
          type="checkbox" 
          name="terms" 
          id="terms" 
          checked={formState.terms} 
          onChange={inputChange}
        />
        Terms & Conditions
      </label>
      <button type="submit">submit</button>
    </form>
  );
}

export default Form;