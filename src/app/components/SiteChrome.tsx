'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const chatEnabled = process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const isAppRoute = pathname.startsWith('/personal') || pathname.startsWith('/admin');

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {chatEnabled && <ChatWidget />}
    </>
  );
}
