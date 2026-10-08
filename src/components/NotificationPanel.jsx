import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  GitMerge, 
  Radio, 
  Clock, 
  Sparkles,
  Trash2
} from 'lucide-react';
import { mockStore } from '../supabase/supabaseClient';

export const NotificationPanel = ({ isOpen, onClose, onNavigate }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(mockStore.getNotifications());

    const unsubscribe = mockStore.subscribe((event) => {
      if (event.type === 'new_notification' || event.type === 'complaints_updated') {
        setNotifications(mockStore.getNotifications());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClearAll = () => {
    localStorage.setItem('civicflow_notifications', JSON.stringify([]));
    setNotifications([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex justify-end pointer-events-auto bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-slate-950/95 border-l border-cyan-500/30 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Real-time Civic Alerts
                </h3>
                <span className="text-[10px] font-mono text-cyan-400">
                  SUPABASE REALTIME ACTIVE
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="mt-4 space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      {notif.type === 'success' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : notif.type === 'warning' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Radio className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                      {notif.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{notif.time || 'Recent'}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                No new realtime alerts. All ward systems nominal.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={handleClearAll}
            className="text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>

          <button
            onClick={() => { onClose(); onNavigate('notifications'); }}
            className="text-cyan-400 hover:underline font-semibold"
          >
            Open Full Alerts Center →
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotificationPanel;
