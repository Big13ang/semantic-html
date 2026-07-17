/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LipstickProductPage from './components/LipstickProductPage';
import EducationalPanel from './components/EducationalPanel';
import { Info, Sparkles, AlertCircle, BookOpen } from 'lucide-react';

export default function App() {
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>('h1-product-title');
  const [isEducationalMode, setIsEducationalMode] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Toggle dark mode classes on body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSelectHeading = (id: string) => {
    setActiveHeadingId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300 font-sans" dir="rtl">
      
      {/* Brand Header & Toggle */}
      <Header
        isEducationalMode={isEducationalMode}
        onToggleEducationalMode={() => setIsEducationalMode(!isEducationalMode)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Responsive Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Welcome Educational Banner */}
        <div className="mb-6 p-4 bg-indigo-50 dark:bg-slate-900 border border-indigo-100 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                شبیه‌ساز تعاملی تگ‌های معنایی وب فارسی
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                این شبیه‌ساز، یک صفحه محصول لوکس رژ لب را در دو حالت طراحی کرده است. در حالت آموزشی (پیش‌فرض)، به کمک خطوط کادربندی رنگی دور تیترها، سلسله‌مراتب تگ‌های <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-rose-600 font-mono font-bold">h1</code> تا <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-rose-600 font-mono font-bold">h6</code> را بیاموزید. روی هر عنوان کلیک کنید تا راز سئو و دلیل قرارگیری آن در درخت محتوا را مشاهده کنید!
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsEducationalMode(!isEducationalMode)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 shrink-0"
          >
            {isEducationalMode ? 'مشاهده صفحه خالص محصول' : 'روشن کردن حالت آموزشی'}
          </button>
        </div>

        {/* Dynamic Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Live Lipstick Product Page (Responsive Right Hand Column) */}
          <section className="lg:col-span-7 xl:col-span-8 order-1">
            <div className="relative">
              {isEducationalMode && (
                <div className="absolute -top-3.5 right-6 bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full z-20 shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>نمای سند شبیه‌ساز (HTML Render)</span>
                </div>
              )}
              <LipstickProductPage
                activeHeadingId={activeHeadingId}
                onSelectHeading={handleSelectHeading}
                isEducationalMode={isEducationalMode}
              />
            </div>
          </section>

          {/* Educational Tree & Control Panel (Responsive Left Hand Column) */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 order-2">
            <EducationalPanel
              activeHeadingId={activeHeadingId}
              onSelectHeading={handleSelectHeading}
              isEducationalMode={isEducationalMode}
              onToggleEducationalMode={() => setIsEducationalMode(!isEducationalMode)}
            />
          </aside>

        </div>

      </main>

      {/* Footer Banner */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            کپی‌رایت © آکادمی وب فارسی | شبیه‌ساز تگ‌های معنایی و بهینه‌سازی محتوا (SEO)
          </p>
          <div className="flex justify-center gap-4 mt-3 text-[11px] text-indigo-500">
            <a href="#product-section" className="hover:underline">سلسله‌مراتب معنایی</a>
            <span>•</span>
            <a href="#ingredients-section" className="hover:underline">ترکیبات ارگانیک</a>
            <span>•</span>
            <a href="#faq-section" className="hover:underline">دستورالعمل‌های استاندارد W3C</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
