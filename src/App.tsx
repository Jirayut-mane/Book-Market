import React, { useState } from 'react';
    import { AuthProvider } from './contexts/AuthContext';
    import { CartProvider } from "./contexts/CartContext";
    import { ThemeProvider } from './contexts/ThemeContext';
    import Navbar from './components/Navbar';
    import BookList from './components/BookList';
    import SearchBar from './components/SearchBar';
    import UserProfile from './components/UserProfile';
    import PurchaseHistory from './components/PurchaseHistory';
    import UserBooks from './components/UserBooks';
    import Settings from './components/Settings';

    function App() {
      const [activeTab, setActiveTab] = useState('books');
      const [searchQuery, setSearchQuery] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('all');

      return (
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Navbar 
                  onSelectCategory={setSelectedCategory} 
                  selectedCategory={selectedCategory}
                  onTabChange={setActiveTab}
                />
                
                <main className="container mx-auto px-4 py-8">
                  <div className="flex flex-col gap-6">
                    {activeTab === 'books' && (
                      <>
                        <SearchBar
                          value={searchQuery}
                          onChange={setSearchQuery}
                        />
                        <BookList
                          searchQuery={searchQuery}
                          category={selectedCategory}
                        />
                      </>
                    )}
                    {activeTab === 'my-books' && <UserBooks />}
                    {activeTab === 'history' && <PurchaseHistory />}
                    {activeTab === 'profile' && <UserProfile />}
                    {activeTab === 'settings' && <Settings />}
                  </div>
                </main>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      );
    }

    export default App;
