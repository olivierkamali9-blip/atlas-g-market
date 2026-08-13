import React, { useState } from 'react';
import Header from './components/Header';
import GTechFooter from './components/GTechFooter';
import UnifiedCatalogView from './components/UnifiedCatalogView';
import AdDetailModal from './components/AdDetailModal';
import AtlasPublishAd from './components/AtlasPublishAd';
import AtlasMessaging from './components/AtlasMessaging';
import './index.css';

export const App: React.FC = () => {
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  return (
    <div className="app-container min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header
        onSearch={(query) => setGlobalSearch(query)}
        onOpenPublish={() => setIsPublishing(true)}
        onOpenMessaging={() => setIsMessagingOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <UnifiedCatalogView
          searchQuery={globalSearch}
          onSelectAd={(id) => setSelectedAdId(id)}
          onOpenPublishModal={() => setIsPublishing(true)}
        />
      </main>

      {selectedAdId && (
        <AdDetailModal
          adId={selectedAdId}
          onClose={() => setSelectedAdId(null)}
          onContactOwner={() => setIsMessagingOpen(true)}
        />
      )}

      {isPublishing && (
        <AtlasPublishAd
          onClose={() => setIsPublishing(false)}
          onSuccess={() => setIsPublishing(false)}
        />
      )}

      {isMessagingOpen && (
        <AtlasMessaging
          onClose={() => setIsMessagingOpen(false)}
        />
      )}

      <GTechFooter />
    </div>
  );
};

export default App;