import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getCallsessionsByDateRange } from '../state/features/call/CallSessions';
import { toast } from 'sonner';

interface CallSession {
  _id: string;
  userId: string;
  technicianId: {
    firstName: string;
    lastName: string;
    phone?: string;
    _id: string;
  };
  startedAt: string;
  endedAt: string;
  duration: number;
}

interface TechnicianGroup {
  technicianId: string;
  technicianName: string;
  phone?: string;
  sessions: CallSession[];
  totalDuration: number;
}

const CallSessions: React.FC = () => {
  const [sessions, setSessions] = useState<TechnicianGroup[]>([]);
  const [startDate, setStartDate] = useState<string>(getDefaultMonday());
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCallSessions();
  }, [startDate, endDate]);

  async function fetchCallSessions() {
    setLoading(true);
    try {
      const response = await getCallsessionsByDateRange(startDate, endDate);
      if (response.status === 200 && Array.isArray(response.data)) {
        const grouped = groupByTechnician(response.data);
        setSessions(grouped);
      } else {
        toast.error(response.message || 'Unexpected response');
      }
    } catch (error: any) {
      console.error('Error fetching sessions:', error);
      toast.error(error.message || 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  }

  function getDefaultMonday(): string {
    const today = dayjs();
    const monday = today.day() === 0 ? today.subtract(6, 'day') : today.startOf('week').add(1, 'day');
    return monday.format('YYYY-MM-DD');
  }

  function groupByTechnician(data: CallSession[]): TechnicianGroup[] {
    const grouped: Record<string, TechnicianGroup> = {};
    data.forEach(session => {
      const techId = session.technicianId._id;
      const techName = `${session.technicianId.firstName} ${session.technicianId.lastName}`;
      if (!grouped[techId]) {
        grouped[techId] = {
          technicianId: techId,
          technicianName: techName,
          phone: session.technicianId.phone,
          sessions: [],
          totalDuration: 0
        };
      }
      grouped[techId].sessions.push(session);
      grouped[techId].totalDuration += session.duration;
    });
    return Object.values(grouped);
  }

  function formatDateTime(date: string) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }

  function formatTotal(seconds: number) {
    const minutes = (seconds / 60).toFixed(2);
    const hours = (seconds / 3600).toFixed(2);
    return `${seconds}s | ${minutes}min | ${hours}hr`;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Call Session Reports</h2>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-5 w-64 bg-gray-200 rounded" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex gap-2">
                  <div className="h-4 w-10 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        sessions.map((group) => (
          <div key={group.technicianId} className="mb-10">
            <h3 className="font-bold text-lg mb-2">
              {group.technicianName} ({group.phone || 'No phone'}) — Total: {formatTotal(group.totalDuration)}
            </h3>
            <table className="w-full table-auto border border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2">#No</th>
                  <th className="border px-3 py-2">User ID</th>
                  <th className="border px-3 py-2">Start Time</th>
                  <th className="border px-3 py-2">End Time</th>
                  <th className="border px-3 py-2">Duration (s)</th>
                </tr>
              </thead>
              <tbody>
                {group.sessions.map((session, idx) => (
                  <tr key={session._id}>
                    <td className="border px-3 py-2">{idx + 1}</td>
                    <td className="border px-3 py-2">{session.userId}</td>
                    <td className="border px-3 py-2">{formatDateTime(session.startedAt)}</td>
                    <td className="border px-3 py-2">{formatDateTime(session.endedAt)}</td>
                    <td className="border px-3 py-2">{session.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default CallSessions;
