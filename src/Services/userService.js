// Mock database with user data
const users = [
    { id: 1, username: 'Rashmi', email: 'rashu@example.com', role: 'admin' },
    { id: 2, username: 'Manisha', email: 'manu@example.com', role: 'user' },
  ];
  
  // Function to fetch all users
  const getAllUsers = () => {
    return users;
  };
  
  // Function to fetch a single user by ID
  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };
  
  module.exports = { getAllUsers, getUserById };
  