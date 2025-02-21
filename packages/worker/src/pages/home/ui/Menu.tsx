import { IconType } from 'react-icons';
import { FaBox, FaTruck } from "react-icons/fa";
import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: '입고 배치',
    description: '입고된 상품을 지정 위치에 배치',
    path: '/inbound/inspection/1',
    icon: FaBox as IconType
  },
  {
    id: 2,
    title: '출고 집품',
    description: '주문 상품 집품 작업',
    path: '/outbound/location/1',
    icon: FaTruck as IconType
  },
];