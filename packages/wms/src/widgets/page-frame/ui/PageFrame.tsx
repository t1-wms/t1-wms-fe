import { Header } from "@widgets/header";
import styles from "./PageFrame.module.css";
import { SideBar } from "@widgets/side-bar";
import { ReactNode } from "react";

interface PageFrameProps {
  children: ReactNode;
}

export const PageFrame = ({ children }: PageFrameProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <SideBar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
