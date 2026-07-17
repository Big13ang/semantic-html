/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PRODUCT_INFO, 
  HEADINGS_DATA, 
  INGREDIENTS, 
  REVIEWS, 
  FAQS 
} from '../data';
import { 
  Star, 
  Info, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  MessageCircle,
  HelpCircle,
  Check
} from 'lucide-react';

interface HeadingWrapperProps {
  id: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  activeHeadingId: string | null;
  onSelect: (id: string) => void;
  isEducationalMode: boolean;
}

// Color and styling helpers based on heading levels
const getHeadingStyle = (level: number) => {
  switch (level) {
    case 1: return 'text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight';
    case 2: return 'text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 border-r-4 border-rose-600 pr-3 my-4';
    case 3: return 'text-lg sm:text-xl font-bold text-indigo-900 dark:text-indigo-400 my-3';
    case 4: return 'text-base sm:text-lg font-semibold text-emerald-800 dark:text-emerald-400 my-2';
    case 5: return 'text-sm sm:text-base font-semibold text-amber-800 dark:text-amber-400 my-1.5';
    case 6: return 'text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 my-1 font-mono';
    default: return 'text-slate-800 dark:text-slate-200';
  }
};

const getLevelColorClass = (level: number) => {
  switch (level) {
    case 1: return 'border-rose-500 bg-rose-50/50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400';
    case 2: return 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400';
    case 3: return 'border-emerald-500 bg-emerald-50/50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400';
    case 4: return 'border-amber-500 bg-amber-50/50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400';
    case 5: return 'border-sky-500 bg-sky-50/50 text-sky-700 dark:bg-sky-950/20 dark:text-sky-400';
    case 6: return 'border-purple-500 bg-purple-50/50 text-purple-700 dark:bg-purple-950/20 dark:text-purple-400';
    default: return 'border-slate-500 bg-slate-50 text-slate-700';
  }
};

const HeadingWrapper = ({
  id,
  tag,
  children,
  activeHeadingId,
  onSelect,
  isEducationalMode,
}: HeadingWrapperProps) => {
  const level = parseInt(tag.replace('h', ''));
  const isSelected = activeHeadingId === id;

  const handleHeadingClick = (e: React.MouseEvent) => {
    if (isEducationalMode) {
      e.preventDefault();
      onSelect(id);
      // Smoothly scroll the tree visualizer into view if it's on mobile
      const element = document.getElementById(`tree-node-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (!isEducationalMode) {
    const Tag = tag;
    return <Tag id={id} className={`${getHeadingStyle(level)} scroll-mt-24`}>{children}</Tag>;
  }

  return (
    <div 
      onClick={handleHeadingClick}
      className={`relative p-2 my-2 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer scroll-mt-24 ${
        isSelected 
          ? 'border-rose-500 bg-rose-50/10 shadow-lg scale-[1.01] dark:bg-rose-950/5' 
          : 'border-indigo-300 hover:border-rose-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40'
      }`}
    >
      {/* Educational Badge */}
      <div 
        className={`absolute -top-3.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 border shadow-sm z-10 ${getLevelColorClass(level)}`}
      >
        <span>&lt;{tag}&gt;</span>
        <span className="hidden sm:inline font-sans text-[9px] font-medium">سطح {level}</span>
        {isSelected && <Sparkles className="w-2.5 h-2.5 animate-spin" />}
      </div>

      {/* The actual HTML Heading tag rendered natively */}
      {React.createElement(tag, { id, className: getHeadingStyle(level) }, children)}

      {/* Helper click indicator */}
      <span className="absolute bottom-1 left-2 text-[9px] text-slate-400 hover:text-slate-600 font-medium">
        (کلیک برای تحلیل تگ)
      </span>
    </div>
  );
};

interface LipstickProductPageProps {
  activeHeadingId: string | null;
  onSelectHeading: (id: string) => void;
  isEducationalMode: boolean;
}

export default function LipstickProductPage({
  activeHeadingId,
  onSelectHeading,
  isEducationalMode,
}: LipstickProductPageProps) {
  const [selectedShade, setSelectedShade] = useState(PRODUCT_INFO.shades[0]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
      
      {/* Product Main Container */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Right Column: Product Images (RTL) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
              <img 
                src={PRODUCT_INFO.imageUrl} 
                alt={PRODUCT_INFO.name}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 right-4 bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-bounce">
                فروش ویژه
              </span>
            </div>

            {/* Core Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">سازگار با پوست حساس</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">ارسال رایگان سراسری</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-1" />
                <span className="text-[10px] text-slate-400 font-medium">۷ روز ضمانت بازگشت</span>
              </div>
            </div>
          </div>

          {/* Left Column: Product Purchase Panel & Details */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* H1 Wrapper */}
            <HeadingWrapper
              id="h1-product-title"
              tag="h1"
              activeHeadingId={activeHeadingId}
              onSelect={onSelectHeading}
              isEducationalMode={isEducationalMode}
            >
              {PRODUCT_INFO.name}
            </HeadingWrapper>

            <span className="text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/20 px-3 py-1 rounded-full w-fit">
              {PRODUCT_INFO.subName}
            </span>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 text-sm border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">{PRODUCT_INFO.rating}</span>
              <span className="text-slate-400">({PRODUCT_INFO.reviewCount} دیدگاه تایید شده)</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400 line-through">{PRODUCT_INFO.price}</span>
                <span className="text-xl font-black text-rose-600 dark:text-rose-400">{PRODUCT_INFO.discountPrice}</span>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-lg">
                ذخیره ۱۵٪
              </span>
            </div>

            {/* Shades Selector */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">انتخاب طیف رنگی رژ لب:</span>
              <div className="flex flex-wrap gap-2.5">
                {PRODUCT_INFO.shades.map((shade) => (
                  <button
                    key={shade.code}
                    onClick={() => setSelectedShade(shade)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                      selectedShade.code === shade.code
                        ? 'border-rose-600 bg-rose-50/20 text-rose-800 dark:border-rose-500 dark:text-rose-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span 
                      className="w-4.5 h-4.5 rounded-full border border-black/10 shrink-0 shadow-sm"
                      style={{ backgroundColor: shade.color }}
                    />
                    <span>{shade.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden w-full sm:w-auto shrink-0 bg-white dark:bg-slate-900">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 font-bold"
                >
                  -
                </button>
                <span className="px-6 py-2 text-sm font-bold text-slate-800 dark:text-slate-100 font-mono w-12 text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className="flex-1 w-full flex items-center justify-center gap-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-rose-600/20 text-sm active:scale-98"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 animate-bounce" />
                    <span>به سبد خرید اضافه شد!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>افزودن رژ لب به سبد خرید</span>
                  </>
                )}
              </button>

              <button className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 transition-colors shrink-0">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Description H2 Section */}
            <section id="product-section" className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <HeadingWrapper
                id="h2-intro"
                tag="h2"
                activeHeadingId={activeHeadingId}
                onSelect={onSelectHeading}
                isEducationalMode={isEducationalMode}
              >
                معرفی کلی رژ لب انار
              </HeadingWrapper>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify mt-2.5">
                {PRODUCT_INFO.description}
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* Section 2: Key Features (Illustrating nested headings h2 -> h3 -> h4 -> h5 -> h6) */}
      <section id="ingredients-section" className="bg-slate-50/50 dark:bg-slate-950/40 p-6 sm:p-8 border-t border-b border-slate-100 dark:border-slate-800/80">
        <HeadingWrapper
          id="h2-features"
          tag="h2"
          activeHeadingId={activeHeadingId}
          onSelect={onSelectHeading}
          isEducationalMode={isEducationalMode}
        >
          ویژگی‌های برجسته محصول
        </HeadingWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Sub-Section 1: Organic (h3) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <HeadingWrapper
              id="h3-organic-formula"
              tag="h3"
              activeHeadingId={activeHeadingId}
              onSelect={onSelectHeading}
              isEducationalMode={isEducationalMode}
            >
              فرمولاسیون ارگانیک و طبیعی
            </HeadingWrapper>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              این رژ لب حاوی عصاره‌های خالص است که سلامت را در اولویت قرار می‌دهد. عسل طبیعی به عنوان نرم‌کننده طبیعی عمل می‌کند.
            </p>

            {/* Nested Detail: Pomegranate Seed Oil (h4) */}
            <div className="mr-4 pr-3 border-r-2 border-dashed border-emerald-200 dark:border-emerald-950/40 mt-2">
              <HeadingWrapper
                id="h4-pomegranate-oil"
                tag="h4"
                activeHeadingId={activeHeadingId}
                onSelect={onSelectHeading}
                isEducationalMode={isEducationalMode}
              >
                تاثیر روغن هسته انار
              </HeadingWrapper>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                روغن به دست آمده از هسته انارهای باغی فشرده شده در دما سرد، حاوی اسیدهای چرب حیاتی است.
              </p>

              {/* Nested Detail: Antioxidants (h5) */}
              <div className="mr-4 pr-3 border-r-2 border-dashed border-amber-200 dark:border-amber-950/40 mt-2">
                <HeadingWrapper
                  id="h5-antioxidants"
                  tag="h5"
                  activeHeadingId={activeHeadingId}
                  onSelect={onSelectHeading}
                  isEducationalMode={isEducationalMode}
                >
                  خواص آنتی‌اکسیدانی قوی وحشی
                </HeadingWrapper>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  پلی‌فنول‌های فعال انار به عنوان قوی‌ترین سد دفاعی در برابر آلودگی هوا و نور خورشید عمل می‌کنند.
                </p>

                {/* Nested Detail: Cellular Repair (h6) */}
                <div className="mr-4 pr-3 border-r-2 border-dashed border-sky-200 dark:border-sky-950/40 mt-2">
                  <HeadingWrapper
                    id="h6-skin-repair"
                    tag="h6"
                    activeHeadingId={activeHeadingId}
                    onSelect={onSelectHeading}
                    isEducationalMode={isEducationalMode}
                  >
                    بازسازی سلول‌های آسیب‌دیده لب
                  </HeadingWrapper>

                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed mt-1">
                    ترمیم ترک‌های پوستی ریز لب با فعال کردن مجاری ساخت پروتئین الاستین و کلاژن لب رخ می‌دهد.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Section 2: Long Lasting (h3) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <HeadingWrapper
              id="h3-long-lasting"
              tag="h3"
              activeHeadingId={activeHeadingId}
              onSelect={onSelectHeading}
              isEducationalMode={isEducationalMode}
            >
              ماندگاری طولانی‌مدت بی‌نظیر
            </HeadingWrapper>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              پیگمنت‌های معدنی ما روی لب اکسید نمی‌شوند، به این معنی که رنگ قرمز اناری زنده محصول از صبح تا انتهای شب ثابت و درخشان بدون پوسته‌پوسته شدن باقی می‌ماند.
            </p>

            {/* Ingredients Bento Table */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">برگه مواد متشکله رژ لب:</span>
              <div className="space-y-1.5">
                {INGREDIENTS.map((ing, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{ing.name}</span>
                    <span className="text-rose-600 dark:text-rose-400 font-mono text-[10px]">{ing.percentage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Reviews (h2 -> h3) */}
      <section id="reviews-section" className="p-6 sm:p-8">
        <HeadingWrapper
          id="h2-reviews"
          tag="h2"
          activeHeadingId={activeHeadingId}
          onSelect={onSelectHeading}
          isEducationalMode={isEducationalMode}
        >
          نظرات و دیدگاه‌های خریداران
        </HeadingWrapper>

        {/* H3 under Reviews */}
        <div className="mt-4">
          <HeadingWrapper
            id="h3-featured-comments"
            tag="h3"
            activeHeadingId={activeHeadingId}
            onSelect={onSelectHeading}
            isEducationalMode={isEducationalMode}
          >
            دیدگاه‌های برگزیده این هفته
          </HeadingWrapper>

          {/* List of comments */}
          <div className="space-y-4 mt-4">
            {REVIEWS.map((review) => (
              <div 
                key={review.id} 
                className="bg-slate-50 dark:bg-slate-800/20 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{review.author}</span>
                    <span className="text-[10px] text-slate-400">{review.date}</span>
                  </div>
                  <div className="flex text-amber-400 shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {review.comment}
                </p>

                {/* Brand Reply */}
                {review.reply && (
                  <div className="mt-3.5 pt-3.5 border-t border-slate-200/60 dark:border-slate-800/60 flex gap-2.5">
                    <div className="w-1.5 bg-rose-500 rounded-full shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>پاسخ مشاور {PRODUCT_INFO.brand}:</span>
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed italic">
                        {review.reply}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: FAQ (h2) */}
      <section id="faq-section" className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80">
        <HeadingWrapper
          id="h2-faq"
          tag="h2"
          activeHeadingId={activeHeadingId}
          onSelect={onSelectHeading}
          isEducationalMode={isEducationalMode}
        >
          سوالات متداول کاربران
        </HeadingWrapper>

        <div className="space-y-3 mt-5">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800"
            >
              <h4 className="text-xs sm:text-sm font-bold text-indigo-950 dark:text-indigo-400 flex items-start gap-2 mb-1.5">
                <HelpCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pr-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

    </article>
  );
}
