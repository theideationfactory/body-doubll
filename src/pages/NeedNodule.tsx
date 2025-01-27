import React from 'react';
import { NavigationStrip } from '../components/NavigationStrip';

export function NeedNodule() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-pink-900 p-4 sm:p-8 pt-24">
      <NavigationStrip />
    </div>
  );
}