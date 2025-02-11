import { useState } from "react";
import styles from "./UserPage.module.css";
import { TestTable } from "@widgets/test-table/ui/TestTable";

export default function UserPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={`${styles.box} shadow-md`}>{open && <TestTable />}</div>

      <button onClick={() => setOpen(true)}>asdf</button>
    </div>
  );
}
