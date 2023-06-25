import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Social media platform',
  description: 'Simple social media platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // prettier-ignore
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
