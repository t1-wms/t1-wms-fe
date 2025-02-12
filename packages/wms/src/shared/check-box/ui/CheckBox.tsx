import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import styles from "./CheckBox.module.css";
import CheckIcon from "@assets/check.svg?react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox = forwardRef(
  ({ ...props }: CheckBoxProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <label className={styles.container} onClick={(e) => e.stopPropagation()}>
        <input ref={ref} type="checkbox" {...props} />
        <div className={styles["icon-wrapper"]}>
          <CheckIcon />
        </div>
      </label>
    );
  }
);
