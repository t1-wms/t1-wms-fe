import { UseSuspenseQueryResult } from "@tanstack/react-query";
import styles from "./DataDisplay.module.css";

interface DataDisplayProps {
  useData: () => UseSuspenseQueryResult<{ data: number }>;
}

export const DataDisplay = ({ useData }: DataDisplayProps) => {
  const { data } = useData();

  return <div className={styles.container}>{data.data}</div>;
};
