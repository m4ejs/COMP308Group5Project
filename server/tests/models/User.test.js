
const mongoose = require('mongoose');
const User = require('../../../../../../../../models/User');

describe('User Model Test', () => {
  it('should create a user with required fields', () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword'
    };
    const user = new User(userData);
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
  });
});
