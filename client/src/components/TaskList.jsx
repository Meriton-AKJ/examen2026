import styles from './TaskList.module.css';

export function TaskList({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}