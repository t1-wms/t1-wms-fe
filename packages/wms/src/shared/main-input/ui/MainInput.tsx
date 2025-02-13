import type { Size } from "@shared/ui/types";
import styles from "./MainInput.module.css";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width: string | "fullWidth";
  fontSize?: Size;
  error?: FieldError;
}

export const Input = forwardRef(
  (
    { label, width, fontSize = "md", error, ...props }: MainInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          {...props}
          ref={ref}
          className={`${styles.container} font-r-${fontSize} ${
            width === "fullWidth" ? styles["full-width"] : ""
          } ${error ? styles.error : ""}`}
        />
        <p className={`${styles.hint} font-r-xs`}>{error && error.message}</p>
      </>
    );
  }
);

export const MainInput = forwardRef(
  (
    { label, width, fontSize = "md", error, ...props }: MainInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        className={`${styles.container}`}
        style={width !== "fullWidth" ? { width } : undefined}
      >
        {label ? (
          <label>
            <div className="font-b-md">{label}</div>
            <Input
              ref={ref}
              label={label}
              width={width}
              fontSize={fontSize}
              error={error}
              {...props}
            />
          </label>
        ) : (
          <Input
            ref={ref}
            label={label}
            width={width}
            fontSize={fontSize}
            error={error}
            {...props}
          />
        )}
      </div>
    );
  }
);
