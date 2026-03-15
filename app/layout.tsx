import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Nitrocare — Medical Furniture & Hospital Equipment',
    template: '%s | Nitrocare',
  },
  description:
    'Leading manufacturer of hospital beds, nursing home furniture, and homecare equipment. Quality and innovation since 2009. Engineered and manufactured in Turkey.',
  keywords: [
    'hospital beds',
    'medical furniture',
    'nursing home equipment',
    'homecare beds',
    'Nitrocare',
    'hospital equipment Turkey',
  ],
  openGraph: {
    title: 'Nitrocare — Medical Furniture & Hospital Equipment',
    description:
      'Leading manufacturer of hospital beds, nursing home furniture, and homecare equipment.',
    type: 'website',
    locale: 'en_US',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
