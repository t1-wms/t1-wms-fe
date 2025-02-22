import { useUserStore } from "@/features";
import LogoImg from "@assets/logo.svg?react";
import LogoutIcon from "@assets/logout.svg?react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import styles from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = useUserStore();
  // TODO 스켈레톤

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [navigate, logout]);

  return (
    <header className={`${styles.container} shadow-md`}>
      <div className={`${styles["logo-box"]}`}>
        <LogoImg />
        <span className="font-b-md">StockHolmes</span>
      </div>
      {user && (
        <div className={styles["profile-box"]}>
          <span className={`${styles["profile-name"]}`}>
            {user.name} {`(${user.staffNumber})`} / {user.userRole}
          </span>
          <button
            className={`${styles["noti-button"]} shadow-md`}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </button>
        </div>
      )}
    </header>
  );
};
