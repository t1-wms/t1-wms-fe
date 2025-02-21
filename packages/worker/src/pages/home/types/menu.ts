import { ReactElement } from 'react';

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: ReactElement | string;
}