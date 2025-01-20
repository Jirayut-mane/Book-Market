import React from 'react';
    import { User, History, Book, Settings, LogOut } from 'lucide-react';
    import { useAuth } from '../contexts/AuthContext';

    interface UserMenuProps {
      onClose: () => void;
      isMobile?: boolean;
      onTabChange: (tab: string) => void;
    }

    const UserMenu = ({ onClose, isMobile = false, onTabChange }: UserMenuProps) => {
      const { logout } = useAuth();

      const menuItems = [
        { icon: User, label: 'โปรไฟล์', action: 'profile' },
        { icon: History, label: 'ประวัติการสั่งซื้อ', action: 'history' },
        { icon: Book, label: 'หนังสือของฉัน', action: 'my-books' },
        { icon: Settings, label: 'ตั้งค่า', action: 'settings' },
      ];

      const handleMenuClick = (action: string) => {
        onTabChange(action);
        onClose();
      };

      const handleLogout = () => {
        logout();
        onClose();
      };

      const baseMenuClasses = isMobile
        ? "space-y-1 py-2"
        : "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50";

      const baseItemClasses = isMobile
        ? "flex items-center space-x-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        : "flex items-center space-x-2 w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

      return (
        <div className={baseMenuClasses}>
          {menuItems.map((item) => (
            <button
              key={item.action}
              onClick={() => handleMenuClick(item.action)}
              className={baseItemClasses}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="border-t dark:border-gray-700 my-2" />
          <button
            onClick={handleLogout}
            className={`${baseItemClasses} text-red-600 dark:text-red-400`}
          >
            <LogOut size={20} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      );
    };

    export default UserMenu;
