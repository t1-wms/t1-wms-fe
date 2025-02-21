import { useUserStore } from "@/features";
import styles from "./Header.module.css";
import NotiIcon from "@assets/notification.svg?react";

export const Header = () => {
  const { user } = useUserStore();
  // TODO 스켈레톤

  return (
    <header className={styles.container}>
      <div className={`${styles["logo-box"]} font-h4`}>T1-WMS</div>
      {user && (
        <div className={styles["profile-box"]}>
          <span className={`${styles["profile-name"]}`}>
            {user.name} / {user.userRole}
          </span>
          <button className={styles["noti-button"]}>
            <NotiIcon />
          </button>
        </div>
      )}
    </header>
  );
};
