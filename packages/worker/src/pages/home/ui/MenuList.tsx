import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '../types/menu';

interface MenuListProps {
  items: MenuItem[];
}

export const MenuList: FC<MenuListProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 pb-14">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => navigate(item.path)}
          className="bg-white p-4 rounded-md shadow-sm border border-gray-200 flex items-center"
        >
          <span className="text-2xl mr-4">{item.icon}</span>
          <div className="text-left">
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};