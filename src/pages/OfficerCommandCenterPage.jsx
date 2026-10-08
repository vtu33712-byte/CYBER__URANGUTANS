import React from 'react';
import OfficerCommandCenter from '../components/OfficerCommandCenter';
import { usePageTransition } from '../hooks/usePageTransition';

export const OfficerCommandCenterPage = ({ onNavigate }) => {
  const pageRef = usePageTransition('officer-command-center');

  return (
    <div ref={pageRef} className="pt-24 pb-16">
      <OfficerCommandCenter onNavigate={onNavigate} />
    </div>
  );
};

export default OfficerCommandCenterPage;
