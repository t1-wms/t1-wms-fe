import { ModalInfoBase } from "@/shared";

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

export interface UserFilter {
  staffNumber?: string;
}

export interface UpdateActiveResDto {
  isActive: boolean;
}

export interface CreateUserModalInfo extends ModalInfoBase {
  key: "createUser";
}
