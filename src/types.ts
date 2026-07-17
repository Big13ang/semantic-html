/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeadingItem {
  id: string; // DOM id
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleFa: string; // Title in Persian
  titleEn: string; // Title in English for reference
  level: number; // 1 to 6
  explanation: string; // Educational explanation in Persian
  seoTip: string; // SEO and accessibility tips in Persian
  nestedUnder?: string; // ID of parent heading
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
}

export interface Ingredient {
  name: string;
  benefit: string;
  percentage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
