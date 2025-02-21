import { Suspense } from "react";
import styles from "./BinPage.module.css";

export const BinPage = () => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<>LOADING</>}></Suspense>
    </div>
  );
};
