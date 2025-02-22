import type { Size } from "@shared/ui/types";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import styles from "./MainInput.module.css";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width: string | "fullWidth";
  fontSize?: Size;
  error?: FieldError | null;
  shrink?: boolean;
}

export const Input = forwardRef(
  (
    { label, width, fontSize = "md", error, shrink, ...props }: MainInputProps,
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
        {error !== null && (
          <p
            className={`${styles.hint} ${
              shrink ? "" : styles["no-shrink"]
            } font-r-xs`}
          >
            {error && error.message}
          </p>
        )}
      </>
    );
  }
);

export const MainInput = forwardRef(
  (
    { label, width, fontSize = "md", error, shrink, ...props }: MainInputProps,
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
              shrink={shrink}
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
            shrink={shrink}
            {...props}
          />
        )}
      </div>
    );
  }
);
