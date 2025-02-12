import { MenuList } from './ui/MenuList';
import { menuItems } from './ui/Menu';

function Home ()  {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-6">WHATCHA</div>
      <MenuList items={menuItems} />
    </div>
  );
};

export default Home;