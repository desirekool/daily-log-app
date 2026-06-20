import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const themes = [
  { key: 'ocean', color: 'bg-blue-500', label: 'Ocean' },
  { key: 'emerald', color: 'bg-emerald-500', label: 'Emerald' },
  { key: 'sunset', color: 'bg-amber-500', label: 'Sunset' },
] as const;

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          title={t.label}
          className={`w-4 h-4 rounded-full ${t.color} transition-all ${
            theme === t.key ? 'ring-2 ring-offset-1 ring-gray-400 scale-125' : 'opacity-60 hover:opacity-100'
          }`}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
