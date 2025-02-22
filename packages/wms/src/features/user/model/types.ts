import {
  Gender,
  ModalInfoBase,
  PageResponse,
  Sort,
  TableParams,
  UserRole,
} from "@/shared";

export interface CurrentUser {
  at: string;
  userId: number;
  name: string;
  profileImage: string;
  staffNumber: string;
  phone: string;
  gender: Gender;
  isActive: boolean;
  address: string;
  userRole: UserRole;
  birthDate: string;
}

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

export interface RegisterUserRequestDto {
  staffNumber: string;
  password: string;
  userRole: string;
  name: string;
  phone: string;
  address: string;
  gender: string;
  isActive: boolean;
  birthDate: string;
  supplierId: number | null;
}

export interface LoginDto {
  staffNumber: string;
  password: string;
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

export interface UserTableParams
  extends TableParams<UserListDto, PageResponse<UserListDto>> {
  sort?: Sort;
  filter?: UserFilter;
}

export interface UseUpdateActiveParams {
  staffNumber: string;
  isActive: boolean;
}

export interface UseUpdateUserRoleParams {
  staffNumber: string;
  newRole: string;
}
