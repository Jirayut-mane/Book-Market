import React, { useState } from 'react';
import { Bell, Eye, Lock, Globe, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState('friends');
  const [language, setLanguage] = useState('th');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ตั้งค่า</h2>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">การแสดงผล</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Moon className="text-gray-600 dark:text-gray-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300">โหมดมืด</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">การแจ้งเตือน</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="text-gray-600 dark:text-gray-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300">การแจ้งเตือนทั้งหมด</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">ความเป็นส่วนตัว</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Lock className="text-gray-600 dark:text-gray-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300">ใครสามารถดูโปรไฟล์ของฉัน</span>
            </div>
            <select
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <option value="public">ทุกคน</option>
              <option value="friends">เฉพาะเพื่อน</option>
              <option value="private">เฉพาะฉัน</option>
            </select>
          </div>
        </div>

        {/* Language Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">ภาษา</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Globe className="text-gray-600 dark:text-gray-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300">เลือกภาษา</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          บันทึกการตั้งค่า
        </button>
      </div>
    </div>
  );
};

export default Settings;
