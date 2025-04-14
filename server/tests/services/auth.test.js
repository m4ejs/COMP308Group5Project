
const jwt = require('jsonwebtoken');
const { generateToken } = require('../../../../../../../../services/auth');

jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  it('should generate a token', () => {
    const payload = { id: '12345' };
    jwt.sign.mockReturnValue('mockedToken');

    const token = generateToken(payload);
    expect(token).toBe('mockedToken');
    expect(jwt.sign).toHaveBeenCalledWith(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  });
});
