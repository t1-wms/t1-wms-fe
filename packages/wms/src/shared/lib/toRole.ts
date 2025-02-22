import { UserRole } from "../model";

export const toRole = (role: UserRole) => {
  return role === "공급업체"
    ? "ROLE_SUPPLIER"
    : role === "관리자"
    ? "ROLE_ADMIN"
    : role === "작업자"
    ? "ROLE_WORKER"
    : "";
};
