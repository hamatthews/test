import styles from '../styles/Task.module.css';
import { TaskFields } from '../types/displayTypes';

type TaskProps = {
  index: number;
  setEditorIndex: React.Dispatch<React.SetStateAction<number | null>>;
  sortList: TaskFields[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskFields[]>>;
};

export default function Task({ index, setEditorIndex, sortList, setTaskList }: TaskProps) {
  const taskData = sortList[index];

  const TaskStatus = () => {
    const toggleStatus = () => {
      const arr = [...sortList];
      arr[index].completed = !arr[index].completed;
      setTaskList(arr);
    };

    return (
      <div className={styles.taskStatus}>
        <svg className={styles.taskStatusBubble} viewBox='0 0 50 50' onClick={toggleStatus}>
          <circle cx='25' cy='25' r='19' fill='none' stroke='black' />
          {taskData.completed && (
            <polyline
              points='15,25 25,35 40,15'
              fill='none'
              stroke='green'
              strokeWidth='8px'
              strokeLinecap='round'
            />
          )}
        </svg>
      </div>
    );
  };
  const TaskLabels = () => {
    return (
      <div className={styles.taskLabels}>
        {taskData.labels.personal && (
          <div className={`${styles.taskLabel} ${styles.personal}`}>Personal</div>
        )}
        {taskData.labels.professional && (
          <div className={`${styles.taskLabel} ${styles.professional}`}>Professional</div>
        )}
        {taskData.labels.urgent && (
          <div className={`${styles.taskLabel} ${styles.urgent}`}>Urgent</div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.task}>
      <TaskStatus />
      <div
        className={`${styles.taskEdit} ${styles.taskField}`}
        onClick={() => setEditorIndex(index)}>
        Edit
      </div>
      <div className={`${styles.taskName} ${styles.taskField}`}>{taskData.title}</div>
      <div className={`${styles.taskDueDate} ${styles.taskField}`}>
        {taskData.date} {taskData.time}
      </div>
      <div className={`${styles.taskDescription} ${styles.taskField}`}>{taskData.description}</div>
      <TaskLabels />
    </div>
  );
}
