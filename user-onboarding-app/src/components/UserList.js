import React from 'react';

const UserList = ({ users }) => {
  
  return (
    <>
      <h2>Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
  </>
  );
}

export default UserList;