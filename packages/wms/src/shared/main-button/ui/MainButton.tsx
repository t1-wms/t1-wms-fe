import { MiniSpinner } from "@/shared/mini-spinner";
import type { Size } from "@shared/ui/types";
import { ButtonHTMLAttributes } from "react";
import { MainButtonColor } from "../model/types";
import styles from "./MainButton.module.css";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: MainButtonColor;
  fullWidth?: boolean;
  bold?: boolean;
  size?: Size;
  padding?: Size;
  isLoading?: boolean;
}

export const MainButton = ({
  fullWidth,
  color = "primary",
  bold,
  size = "md",
  padding = "md",
  isLoading,
  ...props
}: MainButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.container} ${
        fullWidth ? styles["full-width"] : ""
      } ${styles[color]} ${bold ? styles.bold : ""} font-r-${size} ${
        styles[`padding-${padding}`]
      }`}
      onClick={isLoading ? undefined : props.onClick}
    >
      {isLoading ? (
        <div className={`${styles["spinner-container"]} ${styles[size]}`}>
          <MiniSpinner color="50" />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};
