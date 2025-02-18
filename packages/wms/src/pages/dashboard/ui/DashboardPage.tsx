import styles from "./DashboardPage.module.css";

export default function DashBoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={`${styles.box} shadow-md`}></div>
        <div className={`${styles.box} shadow-md`}></div>
      </div>
    </div>
  );
}
