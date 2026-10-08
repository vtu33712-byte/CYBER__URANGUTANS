import React from 'react';
import ReportWizard from '../components/ReportWizard';
import { usePageTransition } from '../hooks/usePageTransition';

export const ReportIssuePage = ({ onNavigate, onCompleteSubmission }) => {
  const pageRef = usePageTransition('report-issue');

  return (
    <div ref={pageRef} className="pt-24 pb-16">
      <ReportWizard onNavigate={onNavigate} onCompleteSubmission={onCompleteSubmission} />
    </div>
  );
};

export default ReportIssuePage;
