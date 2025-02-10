import { ReactNode } from "react";
import styles from "./PageFrame.module.css";

interface PageFrameProps {
  children: ReactNode;
}

export const PageFrame = ({ children }: PageFrameProps) => {
  return <div className={styles.container}>{children}</div>;
};
