import styles from "./Spinner.module.css";

interface SpinnerProps {
  message?: string;
}

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
      {message && <p className="font-h4">{message}</p>}
    </div>
  );
};
