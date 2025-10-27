import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">{children}</main>
      {/* <Footer /> */}
    </>
  );
};
