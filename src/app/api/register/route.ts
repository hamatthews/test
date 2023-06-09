/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from '../../../utils/dbConnect';
import User from '../../../model/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (username: string, email: string, password: string) => {
  if (username.length < 3) {
    return { error: 'Username must have 3 or more characters' };
  }
  if (!validateEmail(email)) {
    return { error: 'Email is invalid' };
  }

  await dbConnect();
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    return { error: 'Email already exists' };
  }

  const name = await User.findOne({ name: username });
  if (name) {
    return { error: 'Username already exists' };
  }

  if (password.length < 5) {
    return { error: 'Password must have 5 or more characters' };
  }

  return null;
};

export async function POST(req: Request) {
  try {
    const res = await req.json();
    const { username, email, password } = res;

    const errorMessage = await validateForm(username, email, password);
    if (errorMessage) {
      console.log('Error on validateForm: ', errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new User on MongoDB
    const newUser = new User({
      name: username,
      email,
      hashedPassword,
    });

    // Save user to database
    await newUser.save().catch((err: any) => {
      console.log('Error on save: ', err);
    });
    return NextResponse.json({ msg: 'Successfully created new User: ' + newUser });
  } catch (err) {
    return NextResponse.json({ error: "Error on '/api/register': " + err });
  }
}
