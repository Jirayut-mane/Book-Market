import React, { useState } from 'react';
import { ShoppingBag, Minus, Plus, X, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ShoppingCartProps {
  onClose: () => void;
}

const ShoppingCart = ({ onClose }: ShoppingCartProps) => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleCheckout = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold">ตะกร้าสินค้า</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {showNotification && (
          <div className="absolute top-4 left-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 text-yellow-800">
            <AlertCircle size={20} />
            <span>ขออภัย ระบบชำระเงินยังไม่พร้อมใช้งาน</span>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            ไม่มีสินค้าในตะกร้า
          </div>
        ) : (
          <>
            <div className="divide-y max-h-[60vh] overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="py-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">{item.price} บาท</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">ยอดรวม</span>
                <span className="font-semibold text-lg">{total} บาท</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                ดำเนินการสั่งซื้อ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
