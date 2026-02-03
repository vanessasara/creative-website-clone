import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title:       'The Creative Website Manual',
  description: 'A single-page editorial site teaching the methodology behind crafting award-winning creative websites.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Dark theme base: bg #080807, default text #fcfcfc */}
      <body className="bg-page-bg text-near-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
