import styles from './TaskItem.module.css';
import stylesForm from './TaskForm.module.css';

export function TaskItem({ task, onDelete, onEdit, onCancel }) {

  return (
    <div className={styles.task}>
      <div className={styles.taskHeader}>
        <div className={styles.taskTitle}>
          <h2>{task.title}</h2>

          <span className={`${styles.badge} ${styles[task.status]}`}>{task.status}</span>
        </div>
        
        <div className={styles.taskActions}>
          <button
            className={`${stylesForm.button}`}
            onClick={() => onEdit(task.id)}>
            Edit
          </button>
          <button
            className={`${stylesForm.button} ${stylesForm.danger}`}
            onClick={() => onDelete(task.id)}>
              Delete
          </button>
          <button
            className={`${stylesForm.button} ${stylesForm.cancel}`}
            onClick={() => onCancel()}>
              Cancel
          </button>
        </div>
      </div>

      <p>{task.description}</p>
    </div>
  );
}