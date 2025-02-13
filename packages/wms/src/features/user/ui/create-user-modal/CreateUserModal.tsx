import styles from "./CreateUserModal.module.css";
import { CreateUserModalInfo } from "../../model";
import { BasicModal, MainInput, MainSelect, useModalStore } from "@/shared";
import { useCreateUserForm } from "../../model/useCreateUserForm";

interface CreateUserModalProps {
  modalInfo: CreateUserModalInfo;
}

const inputWidth = "400px";

export const CreateUserModal = ({}: CreateUserModalProps) => {
  const { inputProps, onSubmit } = useCreateUserForm();

  const { closeModal } = useModalStore();

  return (
    <BasicModal
      modalInfo={{
        key: "basic",
        title: "사용자 추가",
        buttons: [
          {
            label: "취소",
            onClick: closeModal,
            color: "gray",
          },
          { label: "저장", onClick: () => {}, form: "createUser" },
        ],
      }}
    >
      <form className={styles.form} id="createUser" onSubmit={onSubmit}>
        <MainInput width={inputWidth} label="이름" {...inputProps.name} />
        <MainInput
          width={inputWidth}
          label="사번"
          {...inputProps.staffNumber}
        />
        <MainInput
          width={inputWidth}
          label="휴대폰 번호"
          {...inputProps.phone}
        />
        <MainInput width={inputWidth} label="생일" {...inputProps.birthDate} />
        <MainSelect
          width={inputWidth}
          label="성별"
          options={[
            { value: "M", display: "남자" },
            { value: "F", display: "여자" },
          ]}
          {...inputProps.gender}
        />
        <MainSelect
          width={inputWidth}
          label="권한"
          options={[
            { value: "ADMIN", display: "관리자" },
            { value: "WORKER", display: "작업자" },
          ]}
          {...inputProps.userRole}
        />
        <MainSelect
          width={inputWidth}
          label="납품업체"
          options={[
            { value: "HD001", display: "현대모비스" },
            { value: "HD002", display: "현대어쩌구" },
          ]}
          {...inputProps.supplierId}
        />
      </form>
    </BasicModal>
  );
};
