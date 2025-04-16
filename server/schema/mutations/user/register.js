import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
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
      role: { type: GraphQLString },
      location: { type: GraphQLString },
      interests: { type: new GraphQLList(GraphQLString) } // ✅ now supported
    },
    async resolve(_, args) {
      const hashed = await bcrypt.hash(args.password, 10);
      const user = new User({ ...args, password: hashed });
      await user.save();
      return user;
    }
  }
};

export default register;
