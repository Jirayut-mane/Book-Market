import React from 'react';

const PurchaseHistory = () => {
  const purchases = [
    {
      id: 1,
      date: '2024-03-15',
      books: [
        { title: 'เริ่มต้นธุรกิจให้ประสบความสำเร็จ', price: 299 }
      ],
      total: 299
    },
    {
      id: 2,
      date: '2024-03-10',
      books: [
        { title: 'พื้นฐาน Python สำหรับผู้เริ่มต้น', price: 399 },
        { title: 'ชีวิตที่ออกแบบได้', price: 259 }
      ],
      total: 658
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">ประวัติการสั่งซื้อ</h2>
      </div>
      <div className="divide-y">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">วันที่สั่งซื้อ</p>
                <p className="font-medium">{purchase.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">ยอดรวม</p>
                <p className="font-medium">{purchase.total} บาท</p>
              </div>
            </div>
            <div className="space-y-2">
              {purchase.books.map((book, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p>{book.title}</p>
                  <p>{book.price} บาท</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseHistory;
