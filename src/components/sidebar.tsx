import styles from '../styles/Sidebar.module.css';
import { TaskFields } from '../types/displayTypes';

type SidebarProps = {
  setEditorIndex: React.Dispatch<React.SetStateAction<number | null>>;
  taskList: TaskFields[];
  searchSelect: React.RefObject<HTMLInputElement>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sidebar({
  setEditorIndex,
  taskList,
  searchSelect,
  setSearchQuery,
}: SidebarProps) {
  const SearchBox = () => {
    const handleSearchButton = () => {
      if (searchSelect.current && searchSelect.current.value) {
        setSearchQuery(searchSelect.current.value);
      }
    };

    return (
      <div className={styles.searchBoxWrapper}>
        <input ref={searchSelect} className={styles.searchBox} />
        <button className={styles.searchButton} onClick={handleSearchButton}>
          Search
        </button>
      </div>
    );
  };

  const NewTaskBtn = () => {
    return (
      <button
        className={styles.newTaskBtn}
        onClick={() => {
          setEditorIndex(taskList.length);
        }}>
        New Task +
      </button>
    );
  };

  return (
    <div className={styles.sidebar}>
      <SearchBox />
      <NewTaskBtn />
    </div>
  );
}
