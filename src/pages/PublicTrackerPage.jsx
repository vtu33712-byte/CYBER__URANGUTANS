import React from 'react';
import ComplaintTimeline from '../components/ComplaintTimeline';
import { usePageTransition } from '../hooks/usePageTransition';

export const PublicTrackerPage = ({ searchCode = 'CIV-001' }) => {
  const pageRef = usePageTransition('public-tracker');

  return (
    <div ref={pageRef} className="pt-24 pb-16">
      <ComplaintTimeline initialSearchCode={searchCode} />
    </div>
  );
};

export default PublicTrackerPage;
