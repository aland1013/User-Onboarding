import React from 'react';
import styled from 'styled-components';

const DIV = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
`;

const UL = styled.ul`
  margin: 0;
  padding: 0;
`;

const LI = styled.li`
  font-size: 20px;
  text-align: left;
  width: 50%;
  margin: auto;
  padding: 10px;
`;

const UserList = ({ users }) => {
  
  return (
    <DIV>
      <h2>Users:</h2>
      <UL>
        {users.map((user, index) => (
          <LI key={index}>{user}</LI>
        ))}
      </UL>
  </DIV>
  );
}

export default UserList;