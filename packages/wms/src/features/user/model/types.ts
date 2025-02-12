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

export interface UpdateActiveResDto {
  isActive: boolean;
}
