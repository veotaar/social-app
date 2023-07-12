import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const extractBaseUrl = (url: string): string => {
  let correctUrl = url;
  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    correctUrl = 'https://'.concat(correctUrl);
  }

  const parsedUrl = new URL(correctUrl);
  const parts = parsedUrl.hostname.split('.');

  if (parts.length > 2) {
    parts.shift();
  }

  return parts.join('.');
};

export const flattenString = (string: string) => {
  return string.replace(/\s+/g, ' ').trim();
};
