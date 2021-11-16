import AllProjects from "./AllProjects";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.user}>User info</div>
      <div className={styles.projects}>
        <a href="#">New project</a>
        <a href="#">Dashboard</a>
        <AllProjects />
      </div>
      <div className={styles.filters}>Filters</div>
      <div className={styles.users}>Users</div>
      <div className={styles.tasks}>Current project Tasks</div>
    </div>
  );
}
