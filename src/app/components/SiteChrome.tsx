'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { isPortalAppPath, isPortalAuthPath } from '@/lib/portalRoutes';

const chatEnabled = process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const portalAuth = isPortalAuthPath(pathname);
  const portalApp = isPortalAppPath(pathname) && !portalAuth;

  if (portalAuth) {
    return <>{children}</>;
  }

  if (portalApp) {
    return (
      <>
        <Navbar />
        <div className="portal-with-site-nav flex min-h-0 flex-1 flex-col">{children}</div>
      </>
    );
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
