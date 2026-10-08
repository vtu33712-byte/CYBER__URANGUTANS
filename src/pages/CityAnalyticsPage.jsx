import React from 'react';
import Analytics from '../components/Analytics';
import { usePageTransition } from '../hooks/usePageTransition';

export const CityAnalyticsPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('city-analytics');

  return (
    <div ref={pageRef} className="pt-24 pb-16">
      <Analytics />
    </div>
  );
};

export default CityAnalyticsPage;
