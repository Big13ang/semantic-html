/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Code, Award, CheckCircle, Info, Sparkles, HelpCircle, ExternalLink } from 'lucide-react';
import HTMLStructureVisualizer from './HTMLStructureVisualizer';

interface EducationalPanelProps {
  activeHeadingId: string | null;
  onSelectHeading: (id: string) => void;
  isEducationalMode: boolean;
  onToggleEducationalMode: () => void;
}

export default function EducationalPanel({
  activeHeadingId,
  onSelectHeading,
  isEducationalMode,
  onToggleEducationalMode,
}: EducationalPanelProps) {
  const [activeTab, setActiveTab] = useState<'tree' | 'code' | 'rules'>('tree');

  // Colors based on heading levels to draw beautiful code tags
  const getHeadingTagColor = (level: number) => {
    switch (level) {
      case 1: return 'text-rose-600 dark:text-rose-400 font-bold';
      case 2: return 'text-indigo-600 dark:text-indigo-400 font-bold';
      case 3: return 'text-emerald-600 dark:text-emerald-400 font-bold';
      case 4: return 'text-amber-600 dark:text-amber-400 font-bold';
      case 5: return 'text-sky-600 dark:text-sky-400 font-bold';
      case 6: return 'text-purple-600 dark:text-purple-400 font-bold';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
      {/* Panel Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400 shrink-0">
            <BookOpen className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight">آکادمی وب: آموزش HTML معنایی</h3>
            <p className="text-xs text-indigo-200">صفحه محصول رژ لب بر اساس استانداردهای سئو و دسترسی‌پذیری</p>
          </div>
        </div>
        <button
          onClick={onToggleEducationalMode}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-md flex items-center gap-1.5 shrink-0 ${
            isEducationalMode
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
              : 'bg-white hover:bg-slate-100 text-slate-900 shadow-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isEducationalMode ? 'غیرفعال کردن خطوط راهنما' : 'فعال کردن خطوط راهنما (H1-H6)'}</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-2 gap-1">
        <button
          onClick={() => setActiveTab('tree')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'tree'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>سلسله‌مراتب درختی (DOM Tree)</span>
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'code'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>سورس کد آشیانه‌سازی</span>
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'rules'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-800'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>قوانین طلایی سرفصل‌ها</span>
        </button>
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {activeTab === 'tree' && (
            <motion.div
              key="tree-tab"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="flex flex-col gap-4"
            >
              <HTMLStructureVisualizer
                activeHeadingId={activeHeadingId}
                onSelectHeading={onSelectHeading}
                isEducationalMode={isEducationalMode}
              />
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code-tab"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto shadow-inner border border-slate-800 relative">
                <div className="absolute left-4 top-4 bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                  HTML Semantic Outline
                </div>
                
                <div className="space-y-1.5 pt-6 select-all" dir="ltr">
                  <div className="text-slate-500">&lt;!-- ساختار صفحه محصول رژ لب --&gt;</div>
                  <div><span className="text-rose-400">&lt;main&gt;</span></div>
                  
                  <div className="pl-4 border-l border-slate-800">
                    <div>
                      <span className="text-indigo-400">&lt;article</span> className=<span className="text-amber-300">"product-card"</span><span className="text-indigo-400">&gt;</span>
                    </div>
                    
                    <div className="pl-4 border-l border-slate-800 space-y-1">
                      {/* H1 */}
                      <div className={`p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h1-product-title' ? 'bg-rose-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h1-product-title')}>
                        <span className={getHeadingTagColor(1)}>&lt;h1&gt;</span>
                        <span className="text-white font-sans font-bold">رژ لب مخملی انار سرخ</span>
                        <span className={getHeadingTagColor(1)}>&lt;/h1&gt;</span>
                      </div>
                      
                      <div className="text-slate-500 pl-2">&lt;!-- سرفصل های اصلی --&gt;</div>
                      
                      {/* H2 - Intro */}
                      <div className={`p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h2-intro' ? 'bg-indigo-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h2-intro')}>
                        <span className={getHeadingTagColor(2)}>&lt;h2&gt;</span>
                        <span className="text-white font-sans">معرفی کلی رژ لب انار</span>
                        <span className={getHeadingTagColor(2)}>&lt;/h2&gt;</span>
                      </div>
                      
                      {/* H2 - Features */}
                      <div className={`p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h2-features' ? 'bg-indigo-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h2-features')}>
                        <span className={getHeadingTagColor(2)}>&lt;h2&gt;</span>
                        <span className="text-white font-sans">ویژگی‌های برجسته محصول</span>
                        <span className={getHeadingTagColor(2)}>&lt;/h2&gt;</span>
                      </div>

                      {/* H3 - Organic under Features */}
                      <div className={`pl-4 border-l border-indigo-950 p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h3-organic-formula' ? 'bg-emerald-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h3-organic-formula')}>
                        <span className={getHeadingTagColor(3)}>&lt;h3&gt;</span>
                        <span className="text-white font-sans">فرمولاسیون ارگانیک و طبیعی</span>
                        <span className={getHeadingTagColor(3)}>&lt;/h3&gt;</span>
                      </div>

                      {/* H4 - Pomegranate under Organic */}
                      <div className={`pl-8 border-l border-emerald-950 p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h4-pomegranate-oil' ? 'bg-amber-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h4-pomegranate-oil')}>
                        <span className={getHeadingTagColor(4)}>&lt;h4&gt;</span>
                        <span className="text-white font-sans font-medium">تاثیر روغن هسته انار</span>
                        <span className={getHeadingTagColor(4)}>&lt;/h4&gt;</span>
                      </div>

                      {/* H5 - Antioxidants under Pomegranate */}
                      <div className={`pl-12 border-l border-amber-950 p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h5-antioxidants' ? 'bg-sky-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h5-antioxidants')}>
                        <span className={getHeadingTagColor(5)}>&lt;h5&gt;</span>
                        <span className="text-white font-sans">خواص آنتی‌اکسیدانی قوی وحشی</span>
                        <span className={getHeadingTagColor(5)}>&lt;/h5&gt;</span>
                      </div>

                      {/* H6 - Skin Repair under Antioxidants */}
                      <div className={`pl-16 border-l border-sky-950 p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h6-skin-repair' ? 'bg-purple-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h6-skin-repair')}>
                        <span className={getHeadingTagColor(6)}>&lt;h6&gt;</span>
                        <span className="text-white font-sans text-xs">بازسازی سلول‌های آسیب‌دیده لب</span>
                        <span className={getHeadingTagColor(6)}>&lt;/h6&gt;</span>
                      </div>

                      {/* H3 - Long Lasting under Features */}
                      <div className={`pl-4 border-l border-indigo-950 p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h3-long-lasting' ? 'bg-emerald-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h3-long-lasting')}>
                        <span className={getHeadingTagColor(3)}>&lt;h3&gt;</span>
                        <span className="text-white font-sans">ماندگاری طولانی‌مدت بی‌نظیر</span>
                        <span className={getHeadingTagColor(3)}>&lt;/h3&gt;</span>
                      </div>

                      {/* H2 - Reviews */}
                      <div className={`p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h2-reviews' ? 'bg-indigo-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h2-reviews')}>
                        <span className={getHeadingTagColor(2)}>&lt;h2&gt;</span>
                        <span className="text-white font-sans">نظرات و دیدگاه‌های خریداران</span>
                        <span className={getHeadingTagColor(2)}>&lt;/h2&gt;</span>
                      </div>

                      {/* H3 - Featured Reviews */}
                      <div className={`pl-4 border-l border-indigo-950 p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h3-featured-comments' ? 'bg-emerald-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h3-featured-comments')}>
                        <span className={getHeadingTagColor(3)}>&lt;h3&gt;</span>
                        <span className="text-white font-sans">دیدگاه‌های برگزیده این هفته</span>
                        <span className={getHeadingTagColor(3)}>&lt;/h3&gt;</span>
                      </div>

                      {/* H2 - FAQ */}
                      <div className={`p-1 rounded cursor-pointer transition-colors ${activeHeadingId === 'h2-faq' ? 'bg-indigo-500/20' : 'hover:bg-slate-900'}`} onClick={() => onSelectHeading('h2-faq')}>
                        <span className={getHeadingTagColor(2)}>&lt;h2&gt;</span>
                        <span className="text-white font-sans">سوالات متداول کاربران</span>
                        <span className={getHeadingTagColor(2)}>&lt;/h2&gt;</span>
                      </div>
                    </div>
                    <div><span className="text-indigo-400">&lt;/article&gt;</span></div>
                  </div>
                  <div><span className="text-rose-400">&lt;/main&gt;</span></div>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-slate-800/40 p-3 rounded-lg border border-amber-100 dark:border-slate-800 text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                <span className="font-bold">💡 پیشنهاد تعاملی:</span> روی هر کدام از برچسب‌های کد بالا کلیک کنید تا مکان آن هدر مستقیماً روی صفحه شبیه‌ساز محصول برجسته شود. این ساختار آشیانه‌سازی شده، بهترین شبیه‌ساز منطقی برای خزنده‌های گوگل است.
              </div>
            </motion.div>
          )}

          {activeTab === 'rules' && (
            <motion.div
              key="rules-tab"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>قوانین سلسله‌مراتب تیترها در وب</span>
              </h4>

              <div className="space-y-3.5 mt-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">۱. هر صفحه، فقط یک تگ H1</h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    همان‌طور که کتاب فقط یک عنوان اصلی دارد، یک صفحه وب نیز باید تنها یک عنوان <code>&lt;h1&gt;</code> داشته باشد. این تگ نشان‌دهنده هویت کلی محتوا است.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">۲. پله‌کانی بالا و پایین بروید (بدون پرش)</h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    هیچ‌گاه از تگ <code>&lt;h2&gt;</code> مستقیماً به <code>&lt;h4&gt;</code> نروید. حتماً باید سطح میانی یعنی <code>&lt;h3&gt;</code> در این میان وجود داشته باشد تا زنجیره معنایی نشکند.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">۳. استفاده به عنوان استایل ممنوع!</h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    اگر می‌خواهید متنی را بزرگ‌تر یا ضخیم‌تر کنید، از کلاس‌های CSS (مانند <code>text-lg font-bold</code>) استفاده کنید. از تگ‌های هدر فقط برای ساختار منطقی متن استفاده نمایید.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">۴. اهمیت در دسترس‌پذیری (A11y)</h5>
                  <p className="text-slate-600 dark:text-slate-400">
                    افرادی که به دلیل ناتوانی بینایی از نرم‌افزارهای صفحه‌خوان (Screen Reader) استفاده می‌کنند، با کمک کلیدهای میانبر از هدر به هدر دیگر می‌پرند تا خلاصه صفحه را بشنوند. یک ساختار عالی به آن‌ها احساس امنیت و راحتی می‌دهد.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 text-[10px] text-slate-400 flex justify-between items-center">
        <span>ساخته شده برای وب فارسی</span>
        <span className="flex items-center gap-1">
          <span>سئو و معماری محتوا</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
