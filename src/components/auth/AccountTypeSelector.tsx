import React from 'react';
import { User, Shield, Users } from 'lucide-react';
import type { AccountType } from '../../types/auth';

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export function AccountTypeSelector({ value, onChange }: AccountTypeSelectorProps) {
  const options: Array<{
    type: AccountType;
    label: string;
    icon: React.ElementType;
    description: string;
  }> = [
    {
      type: 'client',
      label: 'Client',
      icon: User,
      description: 'I need support and services'
    },
    {
      type: 'doubll',
      label: 'Doubll',
      icon: Users,
      description: 'I want to provide support'
    },
    {
      type: 'admin',
      label: 'Admin',
      icon: Shield,
      description: 'I manage the platform'
    }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80 mb-4">
        Account Type
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map(({ type, label, icon: Icon, description }) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`relative p-4 rounded-xl border transition-all duration-300 ${
              value === type
                ? 'bg-purple-500/30 border-purple-500 ring-2 ring-purple-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <Icon className={`w-6 h-6 ${
                value === type ? 'text-purple-400' : 'text-white/60'
              }`} />
              <div>
                <div className={`font-medium ${
                  value === type ? 'text-purple-400' : 'text-white'
                }`}>
                  {label}
                </div>
                <div className="text-sm text-white/60">
                  {description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}