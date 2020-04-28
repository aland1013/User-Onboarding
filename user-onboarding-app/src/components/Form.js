import React, {useState, useEffect } from 'react';
import * as yup from 'yup';

const Form = () => {
  const [formState, setFormState ] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = yup.object().shape({
    name: yup.string().required('name is a required field'),
    email: yup.string().email('must provide a valid email address').required('email is a required field'),
    password: yup.string().required('password is a required field'),
    terms: yup.boolean().oneOf([true], 'please agree to our terms')
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: '' });
      })
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  }

  useEffect(() => {
    formSchema.isValid(formState).then(valid => setIsButtonDisabled(!valid));
  }, [formState]);

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    };
    validateChange(e);
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
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
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
        {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
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
        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
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
      <button type="submit" disabled={isButtonDisabled} >submit</button>
    </form>
  );
}

export default Form;