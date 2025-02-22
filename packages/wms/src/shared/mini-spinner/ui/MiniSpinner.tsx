import styles from "./MiniSpinner.module.css";

interface MiniSpinnerProps {
  color?: "900" | "50";
}

export const MiniSpinner = ({ color = "900" }: MiniSpinnerProps) => {
  return <span className={`${styles.container} ${styles[`c-${color}`]}`} />;
};
