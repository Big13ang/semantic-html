/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { HEADINGS_DATA } from '../data';
import { HeadingItem } from '../types';
import { FileCode, ArrowLeft, Layers, Sparkles, BookOpen, ChevronLeft } from 'lucide-react';

interface HTMLStructureVisualizerProps {
  activeHeadingId: string | null;
  onSelectHeading: (id: string) => void;
  isEducationalMode: boolean;
}

export default function HTMLStructureVisualizer({
  activeHeadingId,
  onSelectHeading,
  isEducationalMode,
}: HTMLStructureVisualizerProps) {
  // Helper to color-code each heading level
  const getHeadingBadgeStyle = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800';
      case 2:
        return 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800';
      case 3:
        return 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';
      case 4:
        return 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
      case 5:
        return 'bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800';
      case 6:
        return 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getHeadingBorderStyle = (level: number) => {
    switch (level) {
      case 1: return 'border-rose-500';
      case 2: return 'border-indigo-500';
      case 3: return 'border-emerald-500';
      case 4: return 'border-amber-500';
      case 5: return 'border-sky-500';
      case 6: return 'border-purple-500';
      default: return 'border-slate-500';
    }
  };

  // Build tree hierarchy structure
  const buildTree = () => {
    const root: { item: HeadingItem; children: any[] }[] = [];
    const map: { [id: string]: any } = {};

    HEADINGS_DATA.forEach(item => {
      map[item.id] = { item, children: [] };
    });

    HEADINGS_DATA.forEach(item => {
      const mapped = map[item.id];
      if (item.nestedUnder && map[item.nestedUnder]) {
        map[item.nestedUnder].children.push(mapped);
      } else {
        root.push(mapped);
      }
    });

    return root;
  };

  const treeData = buildTree();

  // Recursive tree renderer
  const renderTreeNode = (node: any, depth = 0) => {
    const { item, children } = node;
    const isSelected = activeHeadingId === item.id;

    return (
      <div key={item.id} className="relative my-2 w-full">
        {/* Visual connecting lines */}
        {depth > 0 && (
          <div 
            className="absolute -right-4 top-0 bottom-4 w-4 border-r-2 border-b-2 border-dashed border-slate-300 dark:border-slate-700 rounded-br-lg"
            style={{ height: '24px', marginRight: '-12px' }}
          />
        )}

        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => onSelectHeading(item.id)}
          className={`cursor-pointer p-3 rounded-lg border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-2 ${
            isSelected
              ? 'bg-rose-50/90 border-rose-400 shadow-sm dark:bg-rose-950/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800/60'
          }`}
          id={`tree-node-${item.id}`}
        >
          <div className="flex items-start gap-2.5">
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${getHeadingBadgeStyle(item.level)}`}>
              {item.tag}
            </span>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold transition-colors ${isSelected ? 'text-rose-700 dark:text-rose-300' : 'text-slate-800 dark:text-slate-200'}`}>
                {item.titleFa}
              </span>
              <span className="text-xs text-slate-400 font-mono" dir="ltr">
                {item.titleEn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-medium">
              عمق: {item.level}
            </span>
            <ChevronLeft className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? '-translate-x-1 text-rose-500' : ''}`} />
          </div>
        </motion.div>

        {/* Render children recursively */}
        {children.length > 0 && (
          <div className="mr-5 md:mr-8 border-r-2 border-dotted border-slate-200 dark:border-slate-800 pr-3 md:pr-4 mt-2">
            {children.map((child: any) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Educational Intro */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-xl border border-rose-100 dark:from-slate-900 dark:to-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            ساختار درختی و نقشه راهنمای هدرها در HTML (Outline)
          </h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          تگ‌های <code className="font-mono bg-white dark:bg-slate-800 px-1 rounded text-rose-600 font-semibold border border-slate-200 dark:border-slate-700">h1</code> تا <code className="font-mono bg-white dark:bg-slate-800 px-1 rounded text-rose-600 font-semibold border border-slate-200 dark:border-slate-700">h6</code> نباید بر اساس اندازه فونت انتخاب شوند؛ بلکه نقش آن‌ها تعریف سرفصل مطالب به صورت درختی است. موتورهای جستجو مانند گوگل بر اساس این ساختار متوجه اولویت‌بندی محتوای شما می‌شوند.
        </p>
      </div>

      {/* Interactive Tree View */}
      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">سلسله‌مراتب درختی صفحه محصول</span>
          </div>
          <span className="text-[10px] text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded font-mono">
            DOM Heading Tree
          </span>
        </div>

        {/* Tree Render Root */}
        <div className="flex flex-col gap-2 relative">
          {treeData.map(node => renderTreeNode(node))}
        </div>
      </div>

      {/* Explanatory Guide Box */}
      {activeHeadingId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-indigo-800 p-4 rounded-xl shadow-md"
        >
          {(() => {
            const h = HEADINGS_DATA.find(x => x.id === activeHeadingId);
            if (!h) return null;
            return (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getHeadingBadgeStyle(h.level)}`}>
                      {h.tag}
                    </span>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{h.titleFa}</h5>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">توضیح تگ</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  {h.explanation}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 mb-1 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>نکته بهینه‌سازی (SEO & Accessibility):</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    {h.seoTip}
                  </p>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
