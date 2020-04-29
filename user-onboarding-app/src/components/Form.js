import React, {useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import UserList from './UserList';

const FORM = styled.form`
  border: 1px solid gray;
  border-radius: 8px;
  width: 350px;
  margin: auto;
  padding: 25px;
  background-color: #f8f8f8;
`;

const LABEL = styled.label`
  display: block;
  width: 100%;
  font-size: 20px;
`;

const TXT_INPUT = styled.input`
  display: block;
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0 4px;
  box-sizing: border-box;
  font-size: 16px;

`;

const ERROR_CONTAINER = styled.div`
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4px;
`;

const P = styled.p`
  color: red;
  font-size: 10px;
`;

const BUTTON = styled.button`
  background-color: #337ab7;
  display: block;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  padding: 12px 40px;
  text-decoration: none;
  margin: 25px auto 10px;
  cursor: pointer;
  opacity: ${props => props.disabled ? 0.6 : 1}
`;

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

  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required('name is a required field'),
    email: yup.string().email('must provide a valid email address')
    .test('test', 'That email is already taken',
      function(value) {
        return value !== 'waffle@syrup.com';
      }
    )
    .required('email is a required field'),
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

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post('https://reqres.in/api/users', formState)
      .then(response => {
        console.log(response.data);
        setPost(response.data);
        setUsers([...users, response.data.name]);
        setFormState({
          name: '',
          email: '',
          password: '',
          terms: ''
        });
      })
      .catch(err => console.log(err.response));
  }

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
    <>
      <FORM onSubmit={formSubmit}>
        <LABEL htmlFor="name">
          Name
          <TXT_INPUT 
            type="text" 
            name="name" 
            id="name"
            onChange={inputChange}
            value={formState.name} 
          />
          <ERROR_CONTAINER>
            {errors.name.length > 0 ? <P>{errors.name}</P> : null}
          </ERROR_CONTAINER>
        </LABEL>
        <LABEL htmlFor="email">
          Email
          <TXT_INPUT 
            type="email" 
            name="email" 
            id="email"
            onChange={inputChange}
            value={formState.email} 
          />
          <ERROR_CONTAINER>
            {errors.email.length > 0 ? <P>{errors.email}</P> : null}
          </ERROR_CONTAINER>
        </LABEL>
        <LABEL htmlFor="password">
          Password
          <TXT_INPUT 
            type="text" 
            name="password" 
            id="password" 
            onChange={inputChange}
            value={formState.password}
          />
          <ERROR_CONTAINER>
            {errors.password.length > 0 ? <P>{errors.password}</P> : null}
          </ERROR_CONTAINER>
        </LABEL>
        <LABEL name="terms">
          <input
            type="checkbox" 
            name="terms" 
            id="terms" 
            checked={formState.terms} 
            onChange={inputChange}
          />
          Terms & Conditions
        </LABEL>
        <BUTTON type="submit" disabled={isButtonDisabled} >submit</BUTTON>
      </FORM>
      <UserList users={users} />
    </>
  );
}

export default Form;