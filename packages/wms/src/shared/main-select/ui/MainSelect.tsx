import type { Size } from "@shared/ui/types";
import styles from "./MainSelect.module.css";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { Option } from "../model";

interface MainSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  width: string | "fullWidth";
  fontSize?: Size;
  error?: FieldError;
}

const Select = forwardRef(
  (
    {
      options,
      label,
      width,
      fontSize = "md",
      error,
      ...props
    }: MainSelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <>
        <select
          {...props}
          ref={ref}
          className={`${styles.container} font-r-${fontSize} ${
            width === "fullWidth" ? styles["full-width"] : ""
          } ${error ? styles.error : ""}`}
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.display || option.value}
            </option>
          ))}
        </select>
        <p className={`${styles.hint} font-r-xs`}>{error && error.message}</p>
      </>
    );
  }
);

export const MainSelect = forwardRef(
  (
    {
      options,
      label,
      width,
      fontSize = "md",
      error,
      ...props
    }: MainSelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div
        className={`${styles.container}`}
        style={width !== "fullWidth" ? { width } : undefined}
      >
        {label ? (
          <label>
            <div className="font-b-md">{label}</div>
            <Select
              ref={ref}
              options={options}
              label={label}
              width={width}
              fontSize={fontSize}
              error={error}
              {...props}
            />
          </label>
        ) : (
          <Select
            ref={ref}
            options={options}
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
