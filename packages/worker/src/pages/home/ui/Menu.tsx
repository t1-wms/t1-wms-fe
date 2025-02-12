import { FaBox, FaTruck } from "react-icons/fa";
import { LuForklift } from "react-icons/lu";
import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: '입고 배치',
    description: '입고된 상품을 지정 위치에 배치',
    path: '/inbound',
    icon: <FaBox />
  },
  {
    id: 2,
    title: '출고 집품',
    description: '주문 상품 집품 작업',
    path: '/outbound',
    icon: <FaTruck />
  },
  {
    id: 3,
    title: '재고 이동',
    description: '상품 위치 이동 작업',
    path: '/move',
    icon: <LuForklift />
  }
];