import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import styles from "./MainDateRangePicker.module.css";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Size } from "@/shared/ui";

interface MainDateRangePickerProps {
  label?: string;
  width: string | "fullWidth";
  fontSize?: Size;
  startDateError?: FieldError;
  endDateError?: FieldError;
  startDateInputProps: UseFormRegisterReturn;
  endDateInputProps: UseFormRegisterReturn;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width: string | "fullWidth";
  error?: FieldError;
  fontSize?: Size;
}

const Input = forwardRef(
  (
    { width, fontSize = "md", error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <input
          {...props}
          type="date"
          ref={ref}
          className={`${styles.container} font-r-${fontSize} ${
            width === "fullWidth" ? styles["full-width"] : ""
          } ${error ? styles.error : ""}`}
        />
        <p className={`${styles.hint} font-r-xs`}>{error && error.message}</p>
      </div>
    );
  }
);

export const MainDateRangePicker = ({
  label,
  width,
  fontSize = "md",
  startDateError,
  endDateError,
  startDateInputProps,
  endDateInputProps,
}: MainDateRangePickerProps) => {
  return (
    <div className={`${styles.container}`}>
      {label ? (
        <label>
          <div className="font-b-md">{label}</div>
          <div className={styles.inputs}>
            <Input
              width={width}
              fontSize={fontSize}
              error={startDateError}
              {...startDateInputProps}
            />
            <span>~</span>

            <Input
              width={width}
              fontSize={fontSize}
              error={endDateError}
              {...endDateInputProps}
            />
          </div>
        </label>
      ) : (
        <div className={styles.inputs}>
          <Input
            width={width}
            fontSize={fontSize}
            error={startDateError}
            {...startDateInputProps}
          />
          ~
          <Input
            width={width}
            fontSize={fontSize}
            error={endDateError}
            {...endDateInputProps}
          />
        </div>
      )}
    </div>
  );
};
