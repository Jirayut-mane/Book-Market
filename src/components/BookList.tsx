import React from 'react';
    import { useCart } from '../contexts/CartContext';

    interface Book {
      id: number;
      title: string;
      author: string;
      price: number;
      category: string;
      imageUrl: string;
      description: string;
    }

    interface BookListProps {
      searchQuery: string;
      category: string;
    }

    const books: Book[] = [
      // นวนิยาย (Fiction)
      {
        id: 1,
        title: 'เมื่อคราวที่ฝนพรำ',
        author: 'วิมล ไทรนิ่มนวล',
        price: 295,
        category: 'fiction',
        description: 'เรื่องราวความรักในวันฝนพรำ',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80'
      },
      {
        id: 2,
        title: 'ในวันที่ดอกไม้บาน',
        author: 'สิริมา อภิชาติ',
        price: 250,
        category: 'fiction',
        description: 'นวนิยายรักโรแมนติก',
        imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&q=80'
      },
      {
        id: 3,
        title: 'คืนข้างแรม',
        author: 'ภาคิน รัตนโชติ',
        price: 320,
        category: 'fiction',
        description: 'นวนิยายระทึกขวัญ',
        imageUrl: 'https://images.unsplash.com/photo-1518818419601-72c8673f5852?w=400&q=80'
      },
      {
        id: 4,
        title: 'สายลมแห่งรัก',
        author: 'พิมพ์พลอย วรรณกร',
        price: 280,
        category: 'fiction',
        description: 'นวนิยายรักในรั้วมหาวิทยาลัย',
        imageUrl: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80'
      },
      {
        id: 5,
        title: 'เงาจันทร์',
        author: 'ธารา บุษปะเกศ',
        price: 299,
        category: 'fiction',
        description: 'นวนิยายแฟนตาซี',
        imageUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&q=80'
      },

      // สารคดี (Non-fiction)
      {
        id: 6,
        title: 'เส้นทางนักสำรวจ',
        author: 'สมชาย นักเดินทาง',
        price: 450,
        category: 'non-fiction',
        description: 'บันทึกการเดินทางผจญภัย',
        imageUrl: 'https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?w=400&q=80'
      },
      {
        id: 7,
        title: 'โลกใต้ทะเล',
        author: 'มารีน่า ชลธาร',
        price: 395,
        category: 'non-fiction',
        description: 'สารคดีเกี่ยวกับสิ่งมีชีวิตใต้ทะเล',
        imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&q=80'
      },
      {
        id: 8,
        title: 'ตามรอยอารยธรรม',
        author: 'ดร.ประวัติ ศาสตร์',
        price: 550,
        category: 'non-fiction',
        description: 'การค้นพบทางประวัติศาสตร์',
        imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&q=80'
      },
      {
        id: 9,
        title: 'นกในป่าใหญ่',
        author: 'ธรรมชาติ วิทยา',
        price: 320,
        category: 'non-fiction',
        description: 'สารคดีเกี่ยวกับนกในป่าเมืองไทย',
        imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&q=80'
      },
      {
        id: 10,
        title: 'ดาวและจักรวาล',
        author: 'ดร.ดารา ศาสตร์',
        price: 420,
        category: 'non-fiction',
        description: 'ความลับของจักรวาล',
        imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80'
      },

      // ธุรกิจ (Business)
      {
        id: 11,
        title: 'เริ่มต้นธุรกิจให้สำเร็จ',
        author: 'นักธุรกิจ ใจดี',
        price: 399,
        category: 'business',
        description: 'คู่มือสร้างธุรกิจจากศูนย์',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80'
      },
      {
        id: 12,
        title: 'การลงทุนขั้นเทพ',
        author: 'เศรษฐี มั่งมี',
        price: 450,
        category: 'business',
        description: 'เคล็ดลับการลงทุนให้รวย',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80'
      },
      {
        id: 13,
        title: 'การตลาดยุคดิจิทัล',
        author: 'มาร์เก็ตติ้ง โปร',
        price: 380,
        category: 'business',
        description: 'กลยุทธ์การตลาดออนไลน์',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
      },
      {
        id: 14,
        title: 'ผู้นำยุคใหม่',
        author: 'ลีดเดอร์ ชิพ',
        price: 420,
        category: 'business',
        description: 'การพัฒนาภาวะผู้นำ',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80'
      },
      {
        id: 15,
        title: 'สร้างแบรนด์ให้ปัง',
        author: 'แบรนด์ดิ้ง โปร',
        price: 359,
        category: 'business',
        description: 'กลยุทธ์การสร้างแบรนด์',
        imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&q=80'
      },

      // เทคโนโลยี (Technology)
      {
        id: 16,
        title: 'AI เพื่อทุกคน',
        author: 'ดร.ปัญญา ประดิษฐ์',
        price: 450,
        category: 'technology',
        description: 'พื้นฐาน AI สำหรับผู้เริ่มต้น',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80'
      },
      {
        id: 17,
        title: 'เขียนโค้ดให้เป็นเทพ',
        author: 'โปรแกรมเมอร์ เอ็กซ์',
        price: 399,
        category: 'technology',
        description: 'เทคนิคการเขียนโค้ดระดับสูง',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80'
      },
      {
        id: 18,
        title: 'Blockchain เบื้องต้น',
        author: 'คริปโต เอ็กซ์เพิร์ต',
        price: 520,
        category: 'technology',
        description: 'ทำความเข้าใจ Blockchain',
        imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80'
      },
      {
        id: 19,
        title: 'โลกของ IoT',
        author: 'เทค โนโลยี',
        price: 380,
        category: 'technology',
        description: 'อินเทอร์เน็ตของสรรพสิ่ง',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80'
      },
      {
        id: 20,
        title: 'ความปลอดภัยไซเบอร์',
        author: 'แฮกเกอร์ ขาว',
        price: 420,
        category: 'technology',
        description: 'การรักษาความปลอดภัยทางไซเบอร์',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80'
      },

      // พัฒนาตนเอง (Self-help)
      {
        id: 21,
        title: 'ชีวิตที่ออกแบบได้',
        author: 'โค้ช ชีวิต',
        price: 299,
        category: 'self-help',
        description: 'คู่มือออกแบบชีวิตให้สำเร็จ',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80'
      },
      {
        id: 22,
        title: 'สร้างนิสัยให้รวย',
        author: 'ริช ชี่',
        price: 259,
        category: 'self-help',
        description: 'นิสัยที่จะทำให้คุณรวย',
        imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=80'
      },
      {
        id: 23,
        title: 'พลังแห่งสติ',
        author: 'มายด์ ฟูล',
        price: 280,
        category: 'self-help',
        description: 'การฝึกสติในชีวิตประจำวัน',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80'
      },
      {
        id: 24,
        title: 'ชนะใจคนด้วยจิตวิทยา',
        author: 'ดร.จิต วิทยา',
        price: 320,
        category: 'self-help',
        description: 'จิตวิทยาการสื่อสาร',
        imageUrl: 'https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=400&q=80'
      },
      {
        id: 25,
        title: 'เปลี่ยนความคิด เปลี่ยนชีวิต',
        author: 'ไมนด์ เซ็ต',
        price: 289,
        category: 'self-help',
        description: 'การพัฒนากรอบความคิด',
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80'
      },

      // การศึกษา (Education)
      {
        id: 26,
        title: 'เทคนิคการเรียนเก่ง',
        author: 'ดร.การศึกษา ดี',
        price: 299,
        category: 'education',
        description: 'วิธีการเรียนให้ประสบความสำเร็จ',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80'
      },
      {
        id: 27,
        title: 'พัฒนาทักษะการคิด',
        author: 'ศ.ดร.ปัญญา คิด',
        price: 350,
        category: 'education',
        description: 'การพัฒนาทักษะการคิดวิเคราะห์',
        imageUrl: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&q=80'
      },
      {
        id: 28,
        title: 'ภาษาอังกฤษพิชิต TOEIC',
        author: 'อ.อิงลิช โปร',
        price: 399,
        category: 'education',
        description: 'เตรียมสอบ TOEIC',
        imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80'
      },
      {
        id: 29,
        title: 'คณิตศาสตร์แสนสนุก',
        author: 'ครูคณิต เลข',
        price: 280,
        category: 'education',
        description: 'เรียนคณิตศาสตร์อย่างเข้าใจ',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80'
      },
      {
        id: 30,
        title: 'วิทยาศาสตร์รอบตัว',
        author: 'ดร.วิทย์ ศาสตร์',
        price: 320,
        category: 'education',
        description: 'วิทยาศาสตร์ในชีวิตประจำวัน',
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80'
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
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{book.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">โดย {book.author}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{book.description}</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{book.price} บาท</p>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => addItem({ id: book.id, title: book.title, price: book.price })}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    export default BookList;
