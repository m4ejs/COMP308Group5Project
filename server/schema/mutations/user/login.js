import { GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';
import { generateToken } from '../../../services/auth.js';
import UserType from '../../types/UserType.js';

const login = {
  login: {
    type: new GraphQLObjectType({
      name: 'LoginResponse',
      fields: {
        user: { type: UserType },
        token: { type: GraphQLString },
      }
    }),
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = generateToken(user);

      return {
        user,  // Return user object
        token  // Return token for further use
      };
    }
  }
};

export default login;
