/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {
  const [authType, setAuthType] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const redirectToHome = () => {
    router.push('/Dashboard');
  };

  const loginUser = async () => {
    try {
      const res: any = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `/Dashboard`,
      });
      if (res.error) {
        setError(res.error);
      } else {
        redirectToHome();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const registerUser = async () => {
    try {
      await axios.post(
        '/api/register',
        { username, email, password },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      await loginUser();
      redirectToHome();
    } catch (error: any) {
      setError(error.response.data.error.error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authType === 'login') {
      loginUser();
    } else {
      registerUser();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-4 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center text-gray-800'>
          {authType === 'login' ? 'Log in' : 'Create an account'}
        </h2>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 my-4 rounded'>
            {error}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          {authType === 'register' && (
            <div className='mb-4'>
              <label htmlFor='username' className='block mb-2 text-sm font-bold text-gray-700'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                value={username}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border rounded'
                required
              />
            </div>
          )}
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-2 text-sm font-bold text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-2 text-sm font-bold text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 text-white bg-indigo-600 rounded hover:bg-indigo-500'>
            {authType === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
        <p className='text-sm text-gray-600 mt-4'>
          {authType === 'login' ? "Don't have an account yet?" : 'Already have an account?'}
          <a
            href='#'
            onClick={() => setAuthType(authType === 'login' ? 'register' : 'login')}
            className='text-indigo-600 hover:text-indigo-500 ml-2'>
            {authType === 'login' ? 'Create one' : 'Log in'}
          </a>
        </p>
      </div>
      {/* To Do: 
        Add Provider Login Buttons
      */}
    </div>
  );
}
