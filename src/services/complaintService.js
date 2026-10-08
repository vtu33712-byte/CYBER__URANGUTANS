import { mockStore } from '../supabase/supabaseClient';

export const fetchComplaints = () => {
  return mockStore.getComplaints();
};

export const getComplaintById = (id) => {
  const all = mockStore.getComplaints();
  return all.find(c => c.id === id) || null;
};

export const getComplaintByTrackingCode = (code) => {
  if (!code) return null;
  const clean = code.trim().toUpperCase();
  const all = mockStore.getComplaints();
  return all.find(c => c.trackingCode.toUpperCase() === clean) || null;
};

export const createNewComplaint = (data) => {
  const all = mockStore.getComplaints();
  const randomNum = Math.floor(100 + Math.random() * 900);
  const newComplaint = {
    id: `comp-${Date.now()}`,
    trackingCode: `CIV-${randomNum}`,
    title: data.title || `${data.categoryName || 'Civic'} Issue`,
    category: data.category || 'other',
    status: 'reported',
    priority: data.priority || 'medium',
    reportCount: 1,
    latitude: data.latitude || 12.9716,
    longitude: data.longitude || 77.5946,
    address: data.address || 'Smart City Sector 14',
    wardNumber: data.wardNumber || 14,
    wardName: data.wardName || 'Aero-Vista Tech District',
    assignedOfficer: 'Auto-Routing Pending',
    officerBadge: 'PENDING',
    aiSeverity: data.aiSeverity || 'MEDIUM',
    roadSegment: data.roadSegment || 'Sector-14-Avenue',
    image: data.image || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    description: data.description || 'Civic grievance reported via CivicFlow.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reports: [
      {
        id: `rep-${Date.now()}`,
        user: data.citizenName || 'Maya Vance',
        time: 'Just now',
        note: data.description || 'Initial report submission'
      }
    ],
    timeline: [
      { stage: 'Reported', time: 'Just now', done: true, desc: 'Citizen report logged via CivicFlow' },
      { stage: 'Verified', time: 'Just now', done: true, desc: 'AI Vision analysis verified anomaly' },
      { stage: 'Assigned', time: 'Pending officer dispatch', done: false, desc: 'Routing to nearest ward unit' },
      { stage: 'In Progress', time: 'Pending', done: false, desc: 'Work order generation' },
      { stage: 'Resolved', time: 'Pending', done: false, desc: 'Final site inspection' }
    ]
  };

  const updatedList = [newComplaint, ...all];
  mockStore.saveComplaints(updatedList);

  mockStore.addNotification({
    title: `New Report ${newComplaint.trackingCode}`,
    message: `${newComplaint.title} logged in Ward ${newComplaint.wardNumber}.`,
    type: 'info'
  });

  return newComplaint;
};

/**
 * Merges a duplicate citizen report into an existing master complaint
 */
export const mergeReportIntoComplaint = (primaryComplaintId, newReportData) => {
  const all = mockStore.getComplaints();
  const index = all.findIndex(c => c.id === primaryComplaintId);
  if (index === -1) return null;

  const target = { ...all[index] };
  const previousPriority = target.priority;
  const previousCount = target.reportCount;
  const newCount = previousCount + 1;

  // Auto-escalate priority if report count increases
  let newPriority = previousPriority;
  if (newCount >= 8) {
    newPriority = 'critical';
  } else if (newCount >= 4) {
    newPriority = 'high';
  }

  const newReportItem = {
    id: `rep-merge-${Date.now()}`,
    user: newReportData.citizenName || 'Civic Contributor',
    time: 'Just now',
    note: newReportData.description || 'Additional citizen evidence attached within 50m.'
  };

  target.reportCount = newCount;
  target.priority = newPriority;
  target.reports = [...(target.reports || []), newReportItem];
  target.updatedAt = new Date().toISOString();

  all[index] = target;
  mockStore.saveComplaints(all);

  // Trigger real-time officer notification
  mockStore.addNotification({
    title: `Merged: ${target.trackingCode} (+1 Report)`,
    message: `Report count escalated ${previousCount} → ${newCount}. Priority: ${previousPriority.toUpperCase()} → ${newPriority.toUpperCase()}. Officer alert SENT.`,
    type: 'success'
  });

  return {
    updatedComplaint: target,
    previousCount,
    newCount,
    previousPriority,
    newPriority
  };
};

export const updateComplaintStatus = (complaintId, newStatus, officerNotes) => {
  const all = mockStore.getComplaints();
  const index = all.findIndex(c => c.id === complaintId);
  if (index === -1) return null;

  const target = { ...all[index] };
  target.status = newStatus;
  target.updatedAt = new Date().toISOString();
  if (officerNotes) {
    target.resolutionNotes = officerNotes;
  }

  // Update timeline
  const stageMap = {
    reported: 0,
    verified: 1,
    assigned: 2,
    in_progress: 3,
    resolved: 4
  };

  const targetStageIndex = stageMap[newStatus] ?? 0;
  if (target.timeline) {
    target.timeline = target.timeline.map((step, idx) => ({
      ...step,
      done: idx <= targetStageIndex,
      time: idx === targetStageIndex ? 'Just now' : step.time
    }));
  }

  all[index] = target;
  mockStore.saveComplaints(all);

  mockStore.addNotification({
    title: `${target.trackingCode} Status Updated`,
    message: `Status moved to "${newStatus.replace('_', ' ').toUpperCase()}" by Municipal Ops.`,
    type: newStatus === 'resolved' ? 'success' : 'info'
  });

  return target;
};
