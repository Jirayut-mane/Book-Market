import React, { useState } from 'react';
    import { BookOpen, User, ShoppingCart as CartIcon, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
    import { useAuth } from '../contexts/AuthContext';
    import { useCart } from '../contexts/CartContext';
    import { useTheme } from '../contexts/ThemeContext';
    import LoginForm from './LoginForm';
    import RegisterForm from './RegisterForm';
    import ShoppingCart from './ShoppingCart';
    import UserMenu from './UserMenu';

    interface NavbarProps {
      onSelectCategory: (category: string) => void;
      selectedCategory: string;
      onTabChange: (tab: string) => void;
    }

    const categories = [
      { id: 'all', name: 'ทั้งหมด' },
      { id: 'fiction', name: 'นวนิยาย' },
      { id: 'non-fiction', name: 'สารคดี' },
      { id: 'business', name: 'ธุรกิจ' },
      { id: 'technology', name: 'เทคโนโลยี' },
      { id: 'self-help', name: 'พัฒนาตนเอง' },
      { id: 'education', name: 'การศึกษา' },
    ];

    const Navbar = ({ onSelectCategory, selectedCategory, onTabChange }: NavbarProps) => {
      const { user, logout } = useAuth();
      const { items } = useCart();
      const { isDark, toggleTheme } = useTheme();
      const [showLogin, setShowLogin] = useState(false);
      const [showRegister, setShowRegister] = useState(false);
      const [showCart, setShowCart] = useState(false);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [showCategories, setShowCategories] = useState(false);
      const [showUserMenu, setShowUserMenu] = useState(false);

      const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

      const handleCategorySelect = (category: string) => {
        onSelectCategory(category);
        setShowCategories(false);
      };

      const handleTabSelect = (tab: string) => {
        onTabChange(tab);
        setIsMenuOpen(false);
        setShowUserMenu(false);
      };

      const handleLogoClick = () => {
        onTabChange('books');
      };

      return (
        <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-200 relative">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button onClick={handleLogoClick} className="flex items-center space-x-2">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                <span className="text-xl font-semibold text-gray-900 dark:text-white">ร้านหนังสือออนไลน์</span>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="flex items-center space-x-1 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>{categories.find(cat => cat.id === selectedCategory)?.name || 'หมวดหมู่'}</span>
                    <ChevronDown size={16} />
                  </button>
                  {showCategories && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full text-left px-4 py-2 ${
                            selectedCategory === category.id
                              ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button
                  onClick={() => setShowCart(true)}
                  className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <CartIcon size={24} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </button>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <User size={20} />
                      <span>{user.name}</span>
                      <ChevronDown size={16} />
                    </button>
                    {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} onTabChange={handleTabSelect} />}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      เข้าสู่ระบบ
                    </button>
                    <button
                      onClick={() => setShowRegister(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      สมัครสมาชิก
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
              <div className="px-4 py-2 space-y-2">
                <div className="relative">
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="flex items-center space-x-1 w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>{categories.find(cat => cat.id === selectedCategory)?.name || 'หมวดหมู่'}</span>
                    <ChevronDown size={16} />
                  </button>
                  {showCategories && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className={`w-full text-left px-4 py-2 ${
                            selectedCategory === category.id
                              ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleTheme}
                  className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button
                  onClick={() => setShowCart(true)}
                  className="relative w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <div className="flex items-center">
                    <CartIcon size={24} />
                    <span className="ml-2">ตะกร้าสินค้า</span>
                    {cartItemsCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </button>
                {user ? (
                  <UserMenu isMobile onClose={() => setIsMenuOpen(false)} onTabChange={handleTabSelect} />
                ) : (
                  <>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      เข้าสู่ระบบ
                    </button>
                    <button
                      onClick={() => setShowRegister(true)}
                      className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      สมัครสมาชิก
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
          {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
          {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
        </header>
      );
    }

    export default Navbar;
