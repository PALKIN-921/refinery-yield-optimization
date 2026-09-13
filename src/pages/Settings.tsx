import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Camera, User, Sun, Bell, Cpu, Check } from 'lucide-react';
import ContentHeader from '@/components/layout/ContentHeader';
import { userProfile, primaryColors } from '@/data/settings';

const settingTabs = [
  { id: 'profile', label: 'User Profile', icon: <User size={16} /> },
  { id: 'theme', label: 'Theme', icon: <Sun size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'model', label: 'Model Configurations', icon: <Cpu size={16} /> },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedColor, setSelectedColor] = useState('orange');
  const [profile, setProfile] = useState(userProfile);
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleProfileUpdate = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify(profile)
    );

    alert("Profile Updated Successfully");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <ContentHeader
        icon={<SettingsIcon size={24} />}
        iconBg="bg-navy-900"
        title="Settings"
        subtitle="Manage your preferences and system configurations."
      />

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {settingTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-orange-500' : 'text-gray-500 dark:text-gray-300 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="settings-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
            )}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-6">Profile Information</h3>

            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <User size={32} className="text-gray-400" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <Camera size={14} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Designation</label>
                <input
                  type="text"
                  value={profile.designation}
                  onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Department</label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              onClick={handleProfileUpdate}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Update Profile
            </button>
          </div>

          {/* Theme Settings */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white dark:text-white mb-6">Theme Settings</h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-600 mb-3 block">Choose Theme</label>
                <div className="flex items-center gap-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTheme("light")}
                      className={`px-4 py-2 rounded-lg border ${
                        theme === "light"
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-300"
                      }`}
                    >
                      ☀️ Light
                    </button>

                    <button
                      onClick={() => setTheme("dark")}
                      className={`px-4 py-2 rounded-lg border ${
                        theme === "dark"
                          ? "border-orange-500 bg-gray-800 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      🌙 Dark
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-3 block">Primary Color</label>
                <div className="flex gap-3">
                  {primaryColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name.toLowerCase())}
                      className={`w-10 h-10 rounded-full ${color.class} flex items-center justify-center transition-transform hover:scale-110 ${
                        selectedColor === color.name.toLowerCase() ? 'ring-2 ring-offset-2 ring-gray-300' : ''
                      }`}
                    >
                      {selectedColor === color.name.toLowerCase() && <Check size={16} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-3 block">Dashboard Layout</label>
                <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 w-48">
                  <option>Default</option>
                  <option>Compact</option>
                  <option>Wide</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white dark:text-white">Compact Mode</p>
                  <p className="text-xs text-gray-400">Reduce spacing for more content</p>
                </div>
                <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors">
                  <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow" />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white dark:text-white">Sidebar Position</p>
                </div>
                <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none">
                  <option>Left</option>
                  <option>Right</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab !== 'profile' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-12 text-center"
        >
          <p className="text-gray-400">This section is coming soon.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
