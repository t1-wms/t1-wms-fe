import { IconType } from 'react-icons';

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: IconType;
}