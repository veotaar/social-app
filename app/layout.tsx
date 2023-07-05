import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/ui/Navbar';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import MainLoading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Odin News',
  description: 'Simple social media platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // prettier-ignore
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <Suspense fallback={<MainLoading />} >
          {children}
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
