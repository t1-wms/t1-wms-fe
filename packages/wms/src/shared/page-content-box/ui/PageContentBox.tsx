import { ReactNode } from "react";
import styles from "./PageContentBox.module.css";

interface PageContentBoxProps {
  children: ReactNode;
  stretch?: boolean;
}

export const PageContentBox = ({ children, stretch }: PageContentBoxProps) => {
  return (
    <div
      className={`${styles.container} shadow-md ${
        stretch ? styles.stretch : ""
      }`}
    >
      {children}
    </div>
  );
};
