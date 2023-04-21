import './globals.css';
import Provider from './Provider';

export const metadata = {
  title: 'Task Manager',
  description: 'Manage all your tasks in one place',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
