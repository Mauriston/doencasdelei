import React, { useState } from 'react';
import { DiseaseGuide } from './components/DiseaseGuide';
import { LawReference } from './components/LawReference';
import { Videos } from './components/Videos';
import { NavItem } from './types';
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavItem>('guide');

  const renderView = () => {
    switch (currentView) {
      case 'guide':
        return <DiseaseGuide />;
      case 'laws':
        return <LawReference />;
      case 'videos':
        return <Videos />;
      default:
        return <DiseaseGuide />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-light">
      <main className="flex-grow pb-14 w-full h-full max-w-4xl mx-auto flex flex-col">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-stretch h-16 max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('guide')}
            className="group flex flex-col items-center justify-center w-full h-full pt-2 pb-3"
          >
            <div className={`mb-1 px-5 py-1 rounded-full transition-colors duration-200 flex items-center justify-center ${
              currentView === 'guide' 
                ? 'bg-blue-100 text-navy group-hover:bg-blue-200/80' 
                : 'text-gray-600 group-hover:bg-gray-100'
            }`}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: currentView === 'guide' ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>stethoscope</span>
            </div>
            <span className={`text-[12px] font-medium font-body transition-colors ${currentView === 'guide' ? 'text-navy font-bold' : 'text-gray-600'}`}>Doenças</span>
          </button>

          <button
            onClick={() => setCurrentView('laws')}
            className="group flex flex-col items-center justify-center w-full h-full pt-2 pb-3"
          >
            <div className={`mb-1 px-5 py-1 rounded-full transition-colors duration-200 flex items-center justify-center ${
              currentView === 'laws' 
                ? 'bg-blue-100 text-navy group-hover:bg-blue-200/80' 
                : 'text-gray-600 group-hover:bg-gray-100'
            }`}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: currentView === 'laws' ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>balance</span>
            </div>
            <span className={`text-[12px] font-medium font-body transition-colors ${currentView === 'laws' ? 'text-navy font-bold' : 'text-gray-600'}`}>Legislação</span>
          </button>

          <button
            onClick={() => setCurrentView('videos')}
            className="group flex flex-col items-center justify-center w-full h-full pt-2 pb-3"
          >
            <div className={`mb-1 px-5 py-1 rounded-full transition-colors duration-200 flex items-center justify-center ${
              currentView === 'videos' 
                ? 'bg-blue-100 text-navy group-hover:bg-blue-200/80' 
                : 'text-gray-600 group-hover:bg-gray-100'
            }`}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: currentView === 'videos' ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}>smart_display</span>
            </div>
            <span className={`text-[12px] font-medium font-body transition-colors ${currentView === 'videos' ? 'text-navy font-bold' : 'text-gray-600'}`}>Vídeos</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;