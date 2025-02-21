import { ButtonHTMLAttributes } from "react";
import styles from "./MainButton.module.css";
import type { Size } from "@shared/ui/types";
import { MainButtonColor } from "../model/types";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: MainButtonColor;
  fullWidth?: boolean;
  bold?: boolean;
  size?: Size;
  padding?: Size;
}

export const MainButton = ({
  fullWidth,
  color = "primary",
  bold,
  size = "md",
  padding = "md",
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
    >
      {props.children}
    </button>
  );
};
