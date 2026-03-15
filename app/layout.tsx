import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { FirebaseProvider } from '@/lib/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SeedTrigger from '@/components/SeedTrigger';

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
        <FirebaseProvider>
          <SeedTrigger />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </FirebaseProvider>
      </body>
    </html>
  );
}
