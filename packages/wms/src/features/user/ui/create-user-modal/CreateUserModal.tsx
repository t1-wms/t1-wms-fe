import styles from "./CreateUserModal.module.css";
import {
  CreateUserModalInfo,
  RegisterUserRequestDto,
  useRegisterUser,
} from "../../model";
import {
  BasicModal,
  Gender,
  MainInput,
  MainSelect,
  Option,
  useModalStore,
  UserRole,
} from "@/shared";
import { useCreateUserForm } from "../../model/useCreateUserForm";
import { useSimpleSuppliers } from "@/features/order";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface CreateUserModalProps {
  modalInfo: CreateUserModalInfo;
}

const inputWidth = "400px";

const isUserRole = (value: string): value is UserRole => {
  return value === "작업자" || value === "관리자" || value === "공급업체";
};

export const CreateUserModal = ({}: CreateUserModalProps) => {
  const [userRole, setUserRole] = useState<UserRole>("작업자");
  const [supplierId, setSupplierId] = useState<number>();

  const { closeModal } = useModalStore();

  const queryClient = useQueryClient();
  const { mutate: registerUser } = useRegisterUser(queryClient);

  const handleValid = useCallback(
    (
      name: string,
      staffNumber: string,
      phone: string,
      birthDate: string,
      gender: Gender
    ) => {
      const newUser: RegisterUserRequestDto = {
        name,
        staffNumber,
        phone,
        birthDate,
        gender,
        userRole,
        supplierId: supplierId || null,
        isActive: true,
        address: "",
        password: "1234",
      };

      registerUser(newUser);
      closeModal();
    },
    [userRole, supplierId, closeModal]
  );

  const { inputProps, onSubmit } = useCreateUserForm(handleValid);

  const { data, isPending } = useSimpleSuppliers();

  const supplierOptions: Option[] = useMemo(() => {
    return userRole === "공급업체" && data
      ? data.map((supplier) => ({
          value: String(supplier.supplierId),
          display: supplier.supplierName,
        }))
      : [];
  }, [userRole, data]);

  const handleChangeUserRole: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (isUserRole(e.target.value)) setUserRole(e.target.value);
  };

  const handleChangeSupplierId: ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!Number.isNaN(e.target.value)) {
      setSupplierId(parseInt(e.target.value));
    }
  };

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
          label="사원번호"
          {...inputProps.staffNumber}
        />
        <MainInput
          width={inputWidth}
          label="휴대폰 번호"
          {...inputProps.phone}
        />
        <MainInput
          width={inputWidth}
          label="생일"
          type="date"
          {...inputProps.birthDate}
        />
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
            { value: "작업자", display: "작업자" },
            { value: "관리자", display: "관리자" },
            { value: "공급업체", display: "공급업체" },
          ]}
          value={userRole}
          onChange={handleChangeUserRole}
        />
        <MainSelect
          width={inputWidth}
          label="납품업체"
          disabled={isPending}
          options={supplierOptions}
          isPending={isPending}
          value={supplierId}
          onChange={handleChangeSupplierId}
        />
      </form>
    </BasicModal>
  );
};
