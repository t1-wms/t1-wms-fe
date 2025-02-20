import { ModalInfoBase, Sort, TableParams } from "@/shared";

export interface UserListDto {
  userId: number;
  name: string;
  profileImage: string;
  staffNumber: string;
  phone: string;
  gender: string;
  isActive: boolean;
  address: string;
  userRole: string;
  birthDate: string;
  supplierId: number;
}

export interface UserFilter {
  staffNumber?: string;
}

export interface UpdateActiveResDto {
  isActive: boolean;
}

export interface CreateUserModalInfo extends ModalInfoBase {
  key: "createUser";
}

export interface UserTableParams extends TableParams<UserListDto> {
  sort?: Sort;
  filter?: UserFilter;
}
