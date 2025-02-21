import { useNavigate, useLocation } from 'react-router-dom';
import { navItems} from './NavigationItem';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`p-2 flex flex-col items-center ${
                isActive ? 'text-gray-800' : 'text-gray-500'
              } transition-colors duration-200`}
            >
              <Icon className="text-xl" />
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};