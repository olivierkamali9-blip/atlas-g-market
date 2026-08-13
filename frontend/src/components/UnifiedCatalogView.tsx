import React, { useState } from 'react';
import UniversalSidebar from './UniversalSidebar';
import UniversalCatalog from './UniversalCatalog';
import '../styles/universal-catalog.css';

interface UnifiedCatalogViewProps {
  initialCategory?: string;
  searchQuery?: string;
  onSelectAd?: (adId: string) => void;
  onOpenPublishModal?: () => void;
}

export const UnifiedCatalogView: React.FC<UnifiedCatalogViewProps> = ({
  initialCategory = 'all',
  searchQuery = '',
  onSelectAd,
  onOpenPublishModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'jobs' | 'services' | 'rentals'>('all');
  const [currentSearch, setCurrentSearch] = useState<string>(searchQuery);

  return (
    <div className="atlas-catalog-layout flex flex-col md:flex-row gap-6">
      <UniversalSidebar
        activeCategory={activeCategory}
        onSelectCategory={(catId) => setActiveCategory(catId)}
      />
      <div className="atlas-catalog-content flex-1">
        <UniversalCatalog
          activeCategory={activeCategory}
          activeTab={activeTab}
          searchQuery={currentSearch}
          onTabChange={(tab) => setActiveTab(tab)}
          onSearchChange={(query) => setCurrentSearch(query)}
          onSelectAd={onSelectAd}
          onOpenPublishModal={onOpenPublishModal}
        />
      </div>
    </div>
  );
};

export default UnifiedCatalogView;