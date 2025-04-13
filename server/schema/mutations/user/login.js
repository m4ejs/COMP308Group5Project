import { GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';
import { generateToken } from '../../../services/auth.js';

const login = {
  login: {
    type: GraphQLString,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      return generateToken(user);
    }
  }
};

export default login;
