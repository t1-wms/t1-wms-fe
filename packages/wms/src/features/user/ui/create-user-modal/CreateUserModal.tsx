import styles from "./CreateUserModal.module.css";
import { CreateUserModalInfo } from "../../model";
import { BasicModal, MainInput } from "@/shared";

interface CreateUserModalProps {
  modalInfo: CreateUserModalInfo;
}

export const CreateUserModal = ({}: CreateUserModalProps) => {
  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: "사용자 추가",
        buttons: [
          { label: "취소", onClick: () => {}, color: "gray" },
          { label: "확인", onClick: () => {} },
        ],
      }}
    >
      <form className={styles.form}>
        <MainInput width="240px" />
        <MainInput width="240px" />
        <MainInput width="240px" />
        <MainInput width="240px" />
        <MainInput width="240px" />
        <MainInput width="240px" />
        <MainInput width="240px" />
      </form>
    </BasicModal>
  );
};
