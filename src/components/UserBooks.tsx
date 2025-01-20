import React, { useState, useEffect } from 'react';
    import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
    import { useAuth } from '../contexts/AuthContext';

    interface UserBook {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      imageUrl: string;
    }

    const UserBooks = () => {
      const { user, updateProfile } = useAuth();
      const [sellingBooks, setSellingBooks] = useState<UserBook[]>([]);
      const [purchasedBooks, setPurchasedBooks] = useState<UserBook[]>([]);
      const [isAddingBook, setIsAddingBook] = useState(false);
      const [editingBook, setEditingBook] = useState<UserBook | null>(null);
      const [activeTab, setActiveTab] = useState('selling');
      const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: 'fiction',
        imageUrl: ''
      });

      useEffect(() => {
        if (user) {
          setSellingBooks(user.sellingBooks || []);
          setPurchasedBooks(user.purchasedBooks || []);
        }
      }, [user]);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBook) {
          const updatedBooks = sellingBooks.map(book =>
            book.id === editingBook.id
              ? { ...book, ...formData, price: Number(formData.price) }
              : book
          );
          setSellingBooks(updatedBooks);
          setEditingBook(null);
          if (user) {
            updateProfile({ sellingBooks: updatedBooks });
          }
        } else {
          const newBook = {
            id: Date.now(),
            ...formData,
            price: Number(formData.price)
          };
          const updatedBooks = [...sellingBooks, newBook];
          setSellingBooks(updatedBooks);
          if (user) {
            updateProfile({ sellingBooks: updatedBooks });
          }
        }
        setIsAddingBook(false);
        setFormData({ title: '', price: '', description: '', category: 'fiction', imageUrl: '' });
      };

      const handleEdit = (book: UserBook) => {
        setEditingBook(book);
        setFormData({
          title: book.title,
          price: book.price.toString(),
          description: book.description,
          category: book.category,
          imageUrl: book.imageUrl
        });
        setIsAddingBook(true);
      };

      const handleDelete = (id: number) => {
        const updatedBooks = sellingBooks.filter(book => book.id !== id);
        setSellingBooks(updatedBooks);
        if (user) {
          updateProfile({ sellingBooks: updatedBooks });
        }
      };

      const handleTabChange = (tab: string) => {
        setActiveTab(tab);
      };

      if (!user) return null;

      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">หนังสือของฉัน</h2>
              {activeTab === 'selling' && (
                <button
                  onClick={() => setIsAddingBook(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PlusCircle size={20} />
                  <span>เพิ่มหนังสือ</span>
                </button>
              )}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleTabChange('selling')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'selling'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                หนังสือที่ขาย
              </button>
              <button
                onClick={() => handleTabChange('purchased')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'purchased'
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                หนังสือที่ซื้อ
              </button>
            </div>
          </div>

          {isAddingBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  {editingBook ? 'แก้ไขหนังสือ' : 'เพิ่มหนังสือใหม่'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ชื่อหนังสือ
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      ราคา (บาท)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      รายละเอียด
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      หมวดหมู่
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="fiction">นวนิยาย</option>
                      <option value="non-fiction">สารคดี</option>
                      <option value="business">ธุรกิจ</option>
                      <option value="technology">เทคโนโลยี</option>
                      <option value="self-help">พัฒนาตนเอง</option>
                      <option value="education">การศึกษา</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      URL รูปภาพ
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingBook(false);
                        setEditingBook(null);
                        setFormData({ title: '', price: '', description: '', category: 'fiction', imageUrl: '' });
                      }}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingBook ? 'บันทึกการแก้ไข' : 'เพิ่มหนังสือ'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="p-6">
            {activeTab === 'selling' && (
              <>
                {sellingBooks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    คุณยังไม่มีหนังสือที่ลงขาย
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sellingBooks.map((book) => (
                      <div key={book.id} className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{book.description}</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{book.price} บาท</p>
                          <div className="flex justify-end space-x-2 mt-4">
                            <button
                              onClick={() => handleEdit(book)}
                              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {activeTab === 'purchased' && (
              <>
                {purchasedBooks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    คุณยังไม่มีหนังสือที่ซื้อ
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedBooks.map((book) => (
                      <div key={book.id} className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                        <img
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{book.description}</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{book.price} บาท</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      );
    }

    export default UserBooks;
