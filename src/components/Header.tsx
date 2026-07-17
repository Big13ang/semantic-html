/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ShoppingBag, BookOpen, Layers, Sun, Moon } from 'lucide-react';
import { PRODUCT_INFO } from '../data';

interface HeaderProps {
  isEducationalMode: boolean;
  onToggleEducationalMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  isEducationalMode,
  onToggleEducationalMode,
  isDarkMode,
  onToggleDarkMode
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Right Side: Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
              <span className="font-sans font-black text-lg">گ</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                {PRODUCT_INFO.brand}
              </h1>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">آرایشی ارگانیک و حلال</span>
            </div>
          </div>

          {/* Center Side: Navigation Menu (Decorative/Interactive) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#product-section" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">معرفی محصول</a>
            <a href="#ingredients-section" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">ترکیبات طبیعی</a>
            <a href="#reviews-section" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">نظرات خریداران</a>
            <a href="#faq-section" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">سوالات متداول</a>
          </nav>

          {/* Left Side: Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-all shrink-0"
              title="تغییر تم"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Educational Overlay Button */}
            <button
              onClick={onToggleEducationalMode}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
                isEducationalMode
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">حالت آموزشی (HTML معنایی)</span>
              <span className="sm:hidden">آموزش HTML</span>
            </button>

            {/* Shopping Bag (Decorative) */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer relative shrink-0 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -left-1 w-4.5 h-4.5 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 font-mono">
                ۱
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
