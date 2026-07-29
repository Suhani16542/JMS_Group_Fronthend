import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '@/components/navbar/TopBar';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#9E3371]">
      <ScrollToTop />
      {/* Sticky Header Group: Fixed TopBar + Navbar together */}
      <header className="sticky top-0 z-50 w-full shadow-lg">
        <TopBar />
        <Navbar />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

