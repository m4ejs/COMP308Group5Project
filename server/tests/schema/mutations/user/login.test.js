
const { login } = require('../../../../../../../../schema/mutations/user/login');
const User = require('../../../../../../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../../../../../../../models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Login Mutation', () => {
  it('should login user with correct credentials', async () => {
    const args = { email: 'test@example.com', password: 'password123' };
    const mockUser = { _id: '1', username: 'testuser', email: args.email, password: 'hashedpass' };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mockToken');

    const result = await login(null, args);
    expect(result.token).toBe('mockToken');
    expect(result.user.username).toBe('testuser');
  });
});
