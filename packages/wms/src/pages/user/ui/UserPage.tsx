import styles from "./UserPage.module.css";
import { UserControlPanel, UserTable } from "@features/user";
import { PageContentBox } from "@/shared";
import { Suspense } from "react";

export default function UserPage() {
  return (
    <div className={styles.container}>
      <PageContentBox>
        <UserControlPanel />
      </PageContentBox>
      <PageContentBox stretch>
        <Suspense fallback={<>LOADING</>}>
          <UserTable />
        </Suspense>
      </PageContentBox>
    </div>
  );
}
