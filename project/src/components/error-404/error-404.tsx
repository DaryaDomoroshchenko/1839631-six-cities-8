import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function Error404(): JSX.Element {
  return(
    <div className={styles.page}>
      <div className={styles.wrap}>
        <h1 className={styles.header}>404 Not Found</h1>
        <Link className={styles.link} to='/'>Вернуться на главную</Link>
      </div>
    </div>
  );
}

export default Error404;
