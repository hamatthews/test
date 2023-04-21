import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.name) {
      // remove and non alpha characters from username
      const name = session.user.name.replace(/[^a-zA-Z ]/g, '');
      // Set capitalized username and concat 's
      setUsername(name.charAt(0).toUpperCase() + name.slice(1) + "'s");
    }
  }, [session]);

  return (
    <nav className={styles.nav}>
      <h1 className={styles.appTitle}>{username} Task Tracker</h1>
      <div className='flex flex-row items-center'>
        <Button />
        <svg className={styles.settingsBtn} viewBox='0 0 40 40'>
          <circle cx='20' cy='15' r='10' fill='lightgrey' />
          <circle cx='20' cy='42' r='15' fill='lightgrey' />
        </svg>
      </div>
    </nav>
  );
}
