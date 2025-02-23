import { MainButton, MainInput, useModalStore } from "@/shared";
import { useCallback } from "react";
import { CreateUserModalInfo, useSearchUserForm } from "../../model";
import styles from "./UserControlPanel.module.css";

interface UserControlPanelProps {
  onSearch: (staffNumber: string) => void;
  isLoading: boolean;
  isError: boolean;
}

export const UserControlPanel = ({
  onSearch,
  isLoading,
  isError,
}: UserControlPanelProps) => {
  const { inputProps, onSubmit } = useSearchUserForm(onSearch);

  const { openModal } = useModalStore();

  const handleClickAdd = useCallback(() => {
    const modalInfo: CreateUserModalInfo = {
      key: "createUser",
    };
    openModal(modalInfo);
  }, [openModal]);

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div className={styles["input-box"]}>
        <MainInput
          label="사용자 ID"
          width="120px"
          fontSize="sm"
          autoFocus
          {...inputProps.staffNumber}
        />
      </div>
      <div className={styles["button-box"]}>
        <MainButton size="sm" isLoading={isLoading}>
          조회
        </MainButton>
        <MainButton
          size="sm"
          type="button"
          onClick={handleClickAdd}
          disabled={isError || isLoading}
        >
          추가
        </MainButton>
      </div>
    </form>
  );
};
