import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../utils/mongodb';
import dbconnect from '../../../utils/dbConnect';
import type { SessionStrategy } from 'next-auth';
import { compare } from 'bcrypt';
import User from '../../../model/User';

const START: SessionStrategy = 'jwt';

if (
  !process.env.GITHUB_ID ||
  !process.env.GITHUB_SECRET ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET
) {
  throw new Error('One or more NextAuth environment variable missing.');
}
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials) {
        // Connect to database
        await dbconnect();
        // Find user in database with email address
        const user = await User.findOne({ email: credentials?.email });

        // Email not found
        if (!user) {
          throw new Error('No user found');
        }

        // Check the hashed password against the plain text password
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const isValid = await compare(credentials!.password, user.hashedPassword);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Return user object
        return user;
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/Login',
  },
  debug: true,
  session: {
    strategy: START,
  },
  adapter: MongoDBAdapter(clientPromise, { databaseName: 'nextauth' }),
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
};

export default NextAuth(authOptions);
