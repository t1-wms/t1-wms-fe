import { ButtonHTMLAttributes } from "react";
import styles from "./MainButton.module.css";
import type { Size } from "@shared/ui/types";
import { MainButtonColor } from "../model/types";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: MainButtonColor;
  fullWidth?: boolean;
  bold?: boolean;
  size?: Size;
}

export const MainButton = ({
  fullWidth,
  color = "primary",
  bold,
  size = "md",
  ...props
}: MainButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.container} ${
        fullWidth ? styles["full-width"] : ""
      } ${styles[color]} ${bold ? styles.bold : ""} font-r-${size}`}
    >
      {props.children}
    </button>
  );
};
