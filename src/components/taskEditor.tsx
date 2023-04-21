import { useState, useRef } from 'react';

import styles from '../styles/TaskEditor.module.css';

import { TaskFields } from '../types/displayTypes';

type TaskEditorProps = {
  editorIndex: number;
  setEditorIndex: React.Dispatch<React.SetStateAction<number | null>>;
  sortList: TaskFields[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskFields[]>>;
};

export default function TaskEditor({
  editorIndex,
  setEditorIndex,
  sortList,
  setTaskList,
}: TaskEditorProps) {
  const taskData = sortList[editorIndex];
  const date = new Date();
  let hours = date.getHours().toString();
  if (hours.length === 1) hours = 0 + hours;
  let minutes = date.getMinutes().toString();
  if (minutes.length === 1) minutes = 0 + minutes;

  const [titleValue, setTitleValue] = useState(taskData ? taskData.title : 'Untitled Task');
  const [dateValue, setDateValue] = useState(
    taskData ? taskData.date : new Date().toJSON().slice(0, 10),
  );
  const [timeValue, setTimeValue] = useState(taskData ? taskData.time : hours + ':' + minutes);
  const [personalValue, setPersonalValue] = useState(taskData ? taskData.labels.personal : false);
  const [professionalValue, setProfessionalValue] = useState(
    taskData ? taskData.labels.professional : false,
  );
  const [urgentValue, setUrgentValue] = useState(taskData ? taskData.labels.urgent : false);
  const [descriptionValue, setDescriptionValue] = useState(taskData ? taskData.description : '');

  const titleField = useRef<HTMLInputElement>(null);
  const dateField = useRef<HTMLInputElement>(null);
  const timeField = useRef<HTMLInputElement>(null);
  const personalField = useRef<HTMLInputElement>(null);
  const professionalField = useRef<HTMLInputElement>(null);
  const urgentField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLTextAreaElement>(null);

  const submitButton = () => {
    setEditorIndex(null);

    const arr = [...sortList];

    if (
      titleField.current &&
      dateField.current &&
      timeField.current &&
      personalField.current &&
      professionalField.current &&
      urgentField.current &&
      descriptionField.current
    ) {
      arr[editorIndex] = {
        completed: taskData ? taskData.completed : false,
        title: titleField.current.value || 'Untitled Task',
        date: dateField.current.value || new Date().toJSON().slice(0, 10),
        time: timeField.current.value || hours + ':' + minutes,
        labels: {
          personal: personalField.current.checked,
          professional: professionalField.current.checked,
          urgent: urgentField.current.checked,
        },
        description: descriptionField.current.value,
      };
    }
    setTaskList(arr);
  };

  const discardButton = () => {
    setEditorIndex(null);

    if (taskData) {
      const arr = [...sortList];
      arr.splice(editorIndex, 1);
      setTaskList(arr);
    }
  };

  return (
    <div className={styles.taskEditor}>
      <div className={styles.editorSegment}>
        <h1>Title</h1>
        <input
          className={styles.editorInput}
          ref={titleField}
          value={titleValue}
          onChange={e => setTitleValue(e.target.value)}
        />
      </div>
      <div className={styles.editorSegment}>
        <h1>Due Date</h1>
        <input
          className={styles.editorInput}
          ref={dateField}
          type='date'
          value={dateValue}
          onChange={e => setDateValue(e.target.value)}
        />
      </div>
      <div className={styles.editorSegment}>
        <h1>Due Time</h1>
        <input
          className={styles.editorInput}
          ref={timeField}
          type='time'
          value={timeValue}
          onChange={e => setTimeValue(e.target.value)}
        />
      </div>
      <div className={styles.editorSegment}>
        <h1>Labels</h1>
        <div className={styles.labels}>
          <label>
            Personal{' '}
            <input
              type='checkbox'
              ref={personalField}
              id='personal'
              name='personal'
              checked={personalValue}
              onChange={e => setPersonalValue(e.target.checked)}
            />
          </label>
          <label>
            Professional{' '}
            <input
              type='checkbox'
              ref={professionalField}
              id='professional'
              name='professional'
              checked={professionalValue}
              onChange={e => setProfessionalValue(e.target.checked)}
            />
          </label>
          <label>
            Urgent{' '}
            <input
              type='checkbox'
              ref={urgentField}
              id='urgent'
              name='urgent'
              checked={urgentValue}
              onChange={e => setUrgentValue(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <div className={styles.editorSegment}>
        <h1>Description</h1>
        <textarea
          className={styles.editorInput}
          ref={descriptionField}
          value={descriptionValue}
          onChange={e => setDescriptionValue(e.target.value)}
        />
      </div>
      <button className={styles.btn} onClick={submitButton}>
        Submit
      </button>
      <button className={`${styles.btn} ${styles.discardBtn}`} onClick={discardButton}>
        Discard
      </button>
      <button className={styles.exit} onClick={() => setEditorIndex(null)}>
        x
      </button>
    </div>
  );
}
