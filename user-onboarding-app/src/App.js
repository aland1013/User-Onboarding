import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import Form from './components/Form';

const APP = styled.div`
  width: 60%;
  margin: auto;
`;

const H1 = styled.h1`
  text-align: center;
`;

function App() {
  return (
    <APP>
      <H1>User-Onboarding Project</H1>
      <Form />
    </APP>
  );
}

export default App;
