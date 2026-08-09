import React, { useState } from 'react';
import { AtlasLayout } from './components/AtlasLayout';
import { AtlasSearch } from './components/AtlasSearch';
import { AtlasPublishAd } from './components/AtlasPublishAd';
import { AtlasMessaging } from './components/AtlasMessaging';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'publish' | 'messaging'>('search');

  return (
    <AtlasLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'search' && <AtlasSearch />}
      {activeTab === 'publish' && <AtlasPublishAd onPublished={() => setActiveTab('search')} />}
      {activeTab === 'messaging' && <AtlasMessaging />}
    </AtlasLayout>
  );
};

export default App;