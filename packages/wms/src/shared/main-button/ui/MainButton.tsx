import { ReactNode } from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps {
  children: ReactNode;
  color?: "primary" | "gray";
  fullWidth?: boolean;
  bold?: boolean;
  size?: "sm" | "md";
}

export const MainButton = ({
  children,
  fullWidth,
  color = "primary",
  bold,
  size = "md",
}: MainButtonProps) => {
  return (
    <button
      className={`${styles.container} ${
        fullWidth ? styles["full-width"] : ""
      } ${styles[color]} ${bold ? styles.bold : ""} font-r-${size}`}
    >
      {children}
    </button>
  );
};
