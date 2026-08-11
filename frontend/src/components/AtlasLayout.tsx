import React from 'react';
import Footer from './Footer';

interface AtlasLayoutProps {
  children: React.ReactNode;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AtlasLayout;