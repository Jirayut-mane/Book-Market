import React from 'react';
import { useCart } from '../contexts/CartContext';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface BookListProps {
  searchQuery: string;
  category: string;
}

const books: Book[] = [
  {
    id: 1,
    title: 'เริ่มต้นธุรกิจให้ประสบความสำเร็จ',
    author: 'จอห์น โด',
    price: 299,
    category: 'business',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80'
  },
  {
    id: 2,
    title: 'พื้นฐาน Python สำหรับผู้เริ่มต้น',
    author: 'เจน สมิธ',
    price: 399,
    category: 'technology',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80'
  },
  {
    id: 3,
    title: 'ชีวิตที่ออกแบบได้',
    author: 'มาร์ค วิลสัน',
    price: 259,
    category: 'self-help',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
  }
];

const BookList = ({ searchQuery, category }: BookListProps) => {
  const { addItem } = useCart();
  
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || book.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBooks.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">โดย {book.author}</p>
            <p className="text-lg font-bold text-blue-600">{book.price} บาท</p>
            <button
              onClick={() => addItem({ id: book.id, title: book.title, price: book.price })}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;