import TaskTracker from '../../components/taskTracker';

export const metadata = {
  title: 'Dashboard',
  description: 'Track all your tasks',
};

export default function Page() {
  return (
    <div>
      <TaskTracker />
    </div>
  );
}
