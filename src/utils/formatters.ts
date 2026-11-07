// Persian numeral and price formatting utilities
// Conforms to the Obsidian Reserve design system where all prices and numbers
// follow Persian numeral conventions (۰۱۲۳۴۵۶۷۸۹) with comma thousands separators.

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts any number or string containing ASCII digits (0-9) to Persian digits (۰-۹).
 * E.g., 200 -> '۲۰۰', '15-18' -> '۱۵-۱۸', 'Order #104' -> 'Order #۱۰۴'
 */
export const toPersianDigits = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
};

/**
 * Formats a monetary amount into Persian digits with comma thousands separators,
 * matching the exact price format seen in the artisan menu items (e.g. '۲۴۵,۰۰۰').
 */
export const formatPersianPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined || isNaN(Number(price))) return '۰';
  const withCommas = Math.round(Number(price)).toLocaleString('en-US');
  return toPersianDigits(withCommas);
};

/**
 * Formats a monetary amount with currency suffix (e.g. '۲۴۵,۰۰۰ تومان').
 */
export const formatPersianPriceWithToman = (price: number | null | undefined): string => {
  return `${formatPersianPrice(price)} تومان`;
};

/**
 * Converts Persian or Arabic digits back to English ASCII digits if needed for parsing.
 */
export const toEnglishDigits = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
};
