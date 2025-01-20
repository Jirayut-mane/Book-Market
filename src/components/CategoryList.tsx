import React from 'react';

interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
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

const CategoryList = ({ selectedCategory, onSelectCategory }: CategoryListProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">หมวดหมู่</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
