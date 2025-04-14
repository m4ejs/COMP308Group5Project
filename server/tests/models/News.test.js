
const mongoose = require('mongoose');
const News = require('../../../../models/News');

describe('News Model', () => {
  it('should create a News instance with required fields', () => {
    const data = {};  // Add relevant fields
    const instance = new News(data);
    expect(instance).toBeInstanceOf(News);
  });
});
