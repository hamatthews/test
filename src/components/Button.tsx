'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();
  return (
    <div>
      {!session && (
        <button className='px-4 py-2 text-white bg-blue-500 rounded-md' onClick={() => signIn()}>
          Login
        </button>
      )}
      {session && (
        <>
          <button className='px-4 py-2 text-white bg-blue-500 rounded-md' onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      )}
    </div>
  );
}
