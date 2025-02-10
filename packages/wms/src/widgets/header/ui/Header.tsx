import styles from "./Header.module.css";
import NotiIcon from "@assets/notification.svg?react";

export const Header = () => {
  return (
    <header className={styles.container}>
      <div className={`${styles["logo-box"]} font-h4`}>T1-WMS</div>
      <div className={styles["profile-box"]}>
        <span className={`${styles["profile-name"]}`}>박상연 / WMS 관리자</span>
        <button className={styles["noti-button"]}>
          <NotiIcon />
        </button>
      </div>
    </header>
  );
};
