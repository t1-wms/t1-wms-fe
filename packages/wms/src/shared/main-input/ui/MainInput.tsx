import type { Size } from "@shared/ui/types";
import styles from "./MainInput.module.css";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  fontSize?: Size;
}

export const MainInput = forwardRef(
  (
    { fullWidth, fontSize = "md", ...props }: MainInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`${styles.container} font-r-${fontSize} ${
          fullWidth ? styles["full-width"] : ""
        }`}
      />
    );
  }
);
