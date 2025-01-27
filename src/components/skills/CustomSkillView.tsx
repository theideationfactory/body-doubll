import React, { useState } from 'react';
import { ChevronLeft, Check, Search } from 'lucide-react';
import { skillIcons, type SkillIconName } from '../../utils/skillIcons';

interface CustomSkillViewProps {
  onBack: () => void;
  onAdd: (skill: { name: string; icon: string }) => void;
}

export function CustomSkillView({ onBack, onAdd }: CustomSkillViewProps) {
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<SkillIconName | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = Array.from(
    new Set(Object.values(skillIcons).map(icon => icon.category))
  ).sort();

  const filteredIcons = Object.entries(skillIcons).filter(([name, { category }]) => {
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedIcon) {
      onAdd({ name, icon: selectedIcon });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="space-y-6">
        {/* Skill Name Input */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">
            Skill Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter skill name"
            required
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Icon Search */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2">
            Search Icons
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search icons..."
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          </div>
        </div>

        {/* Icon Grid */}
        <div className="h-64 overflow-y-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 p-2">
            {filteredIcons.map(([iconName, { icon: Icon, category }]) => (
              <button
                key={iconName}
                type="button"
                onClick={() => setSelectedIcon(iconName as SkillIconName)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedIcon === iconName
                    ? 'bg-blue-500/30 ring-2 ring-blue-500'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-white" />
                  <span className="text-xs text-white/60 truncate w-full text-center">
                    {iconName}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name || !selectedIcon}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Check size={20} />
          Add Custom Skill
        </button>
      </div>
    </form>
  );
}