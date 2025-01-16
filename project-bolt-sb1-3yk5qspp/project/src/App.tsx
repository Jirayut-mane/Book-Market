import React, { useState } from 'react';
import { Search, BookOpen, History, User, Menu } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import CategoryList from './components/CategoryList';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import PurchaseHistory from './components/PurchaseHistory';

function App() {
  const [activeTab, setActiveTab] = useState('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <aside className="w-full md:w-64 space-y-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-lg font-semibold mb-4">เมนู</h2>
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('books')}
                      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        activeTab === 'books' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <BookOpen size={20} />
                      <span>หนังสือทั้งหมด</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('history')}
                      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <History size={20} />
                      <span>ประวัติการซื้อ</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                      }`}
                    >
                      <User size={20} />
                      <span>โปรไฟล์</span>
                    </button>
                  </nav>
                </div>
                
                <CategoryList
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
                
                {activeTab === 'books' && (
                  <BookList
                    searchQuery={searchQuery}
                    category={selectedCategory}
                  />
                )}
                {activeTab === 'history' && <PurchaseHistory />}
                {activeTab === 'profile' && <UserProfile />}
              </div>
            </div>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;