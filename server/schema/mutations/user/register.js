import { GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';
import UserType from '../../types/UserType.js';

const register = {
  register: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      role: { type: GraphQLString }
    },
    async resolve(_, args) {
      const hashed = await bcrypt.hash(args.password, 10);
      const user = new User({ ...args, password: hashed });
      return user.save();
    }
  }
};

export default register;
