import { createClient } from '@supabase/supabase-js';
import { INITIAL_COMPLAINTS, INITIAL_CITY_STATS, WARDS_DATA } from '../data/mockData';

// User Supabase Configuration (Defaulting to user's provided key)
export const DEFAULT_SUPABASE_KEY = 'sb_publishable_7lRSsVFYZpn0zej4ZuIqBQ_7z8Uy6fH';
export const DEFAULT_SUPABASE_URL = 'https://vibecoding-civicflow.supabase.co';

const getStoredSupabaseUrl = () => {
  return (
    localStorage.getItem('civicflow_supabase_url') ||
    import.meta.env.VITE_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL
  );
};

const getStoredSupabaseKey = () => {
  return (
    localStorage.getItem('civicflow_supabase_key') ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_KEY
  );
};

export const supabaseUrl = getStoredSupabaseUrl();
export const supabaseAnonKey = getStoredSupabaseKey();

export const isRealSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseAnonKey.length > 10
);

// Safe Real Client Initialization
let client = null;
try {
  if (isRealSupabaseConfigured) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true },
      realtime: { params: { eventsPerSecond: 10 } }
    });
  }
} catch (err) {
  console.warn('Real Supabase client initialization notice:', err);
}

export const realSupabase = client;

/**
 * Robust Local Reactive Store simulating Supabase Database & Realtime
 */
class MockSupabaseStore {
  constructor() {
    this.complaintsKey = 'civicflow_complaints';
    this.notificationsKey = 'civicflow_notifications';
    this.listeners = new Set();
    this.initStore();
  }

  initStore() {
    const storedComplaints = localStorage.getItem(this.complaintsKey);
    if (!storedComplaints) {
      localStorage.setItem(this.complaintsKey, JSON.stringify(INITIAL_COMPLAINTS));
    }
    const storedNotifs = localStorage.getItem(this.notificationsKey);
    if (!storedNotifs) {
      const initialNotifs = [
        {
          id: 'notif-1',
          title: 'CIV-001 Priority Escalated',
          message: 'Asphalt cavity escalated from MEDIUM to HIGH following 7 citizen confirmations in Ward 14.',
          type: 'warning',
          time: '15m ago',
          read: false
        },
        {
          id: 'notif-2',
          title: 'AI Duplicate Prevented',
          message: 'Nearby report merged into CIV-014 (Water Leak) within 18m radius.',
          type: 'success',
          time: '1h ago',
          read: false
        }
      ];
      localStorage.setItem(this.notificationsKey, JSON.stringify(initialNotifs));
    }
  }

  getComplaints() {
    try {
      const data = localStorage.getItem(this.complaintsKey);
      return data ? JSON.parse(data) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  }

  saveComplaints(complaints) {
    localStorage.setItem(this.complaintsKey, JSON.stringify(complaints));
    this.notify({ type: 'complaints_updated', data: complaints });
  }

  getNotifications() {
    try {
      const data = localStorage.getItem(this.notificationsKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addNotification(notif) {
    const current = this.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      read: false,
      ...notif
    };
    const updated = [newNotif, ...current];
    localStorage.setItem(this.notificationsKey, JSON.stringify(updated));
    this.notify({ type: 'new_notification', data: newNotif });
    return newNotif;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event) {
    this.listeners.forEach(fn => {
      try {
        fn(event);
      } catch (err) {
        console.error('Error in listener:', err);
      }
    });
  }

  resetToDefault() {
    localStorage.setItem(this.complaintsKey, JSON.stringify(INITIAL_COMPLAINTS));
    this.notify({ type: 'complaints_updated', data: INITIAL_COMPLAINTS });
  }
}

export const mockStore = new MockSupabaseStore();

// Default unified supabase export
export const supabase = realSupabase || mockStore;
export default supabase;
