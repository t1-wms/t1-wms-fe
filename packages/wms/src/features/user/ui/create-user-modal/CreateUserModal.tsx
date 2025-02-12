import styles from "./CreateUserModal.module.css";
import { CreateUserModalInfo } from "../../model";
import { BasicModal, MainInput, MainSelect } from "@/shared";

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
        <MainInput width="240px" label="이름" />
        <MainInput width="240px" label="사번" />
        <MainInput width="240px" label="휴대폰 번호" />
        <MainInput width="240px" label="생일" />
        <MainSelect
          width="240px"
          label="성별"
          options={[
            { value: "M", display: "남자" },
            { value: "F", display: "여자" },
          ]}
        />
        <MainSelect
          width="240px"
          label="권한"
          options={[
            { value: "ADMIN", display: "관리자" },
            { value: "WORKER", display: "작업자" },
          ]}
        />
        <MainSelect
          width="240px"
          label="납품업체"
          options={[
            { value: "HD001", display: "현대모비스" },
            { value: "HD002", display: "현대어쩌구" },
          ]}
        />
      </form>
    </BasicModal>
  );
};
