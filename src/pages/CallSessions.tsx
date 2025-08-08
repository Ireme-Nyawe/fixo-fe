import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getCallsessionsByDateRange } from "../state/features/call/CallSessions";
import { toast } from "sonner";

interface CallSession {
  _id: string;
  userId: string;
  technicianId: {
    firstName: string;
    lastName: string;
    phone?: string;
    _id: string;
  } | null;
  startedAt: string;
  endedAt: string;
  duration: number;
  createdAt:string;
}

interface TechnicianGroup {
  technicianId: string;
  technicianName: string;
  phone?: string;
  sessions: CallSession[];
  totalDuration: number;
}

interface MissedCall {
  _id: string;
  userId: string;
  technicianName: string;
  createdAt: string;
  startedAt:string;
  endedAt:string;
}

type ActiveTab = "completed" | "missed";

const CallSessions: React.FC = () => {
  const [sessions, setSessions] = useState<TechnicianGroup[]>([]);
  const [missedCalls, setMissedCalls] = useState<MissedCall[]>([]);
  const [filtered, setFiltered] = useState<TechnicianGroup[]>([]);
  const [filteredMissed, setFilteredMissed] = useState<MissedCall[]>([]);
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState<string>(getDefaultMonday());
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("completed");

  useEffect(() => {
    fetchCallSessions();
  }, [startDate, endDate]);

  useEffect(() => {
    applyFilter();
  }, [filterText, sessions, missedCalls]);

  const fetchCallSessions = async () => {
    setLoading(true);
    try {
      const response = await getCallsessionsByDateRange(startDate, endDate);
      if (response && Array.isArray(response)) {
        const { completedSessions, missedSessions } =
          separateSessions(response);
        const grouped = groupByTechnician(completedSessions);
        setSessions(grouped);
        setFiltered(grouped);
        setMissedCalls(missedSessions);
        setFilteredMissed(missedSessions);
      } else {
        toast.error(response.message || "Unexpected response");
      }
    } catch (error: any) {
      console.error("Error fetching sessions:", error);
      toast.error(error.message || "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  function getDefaultMonday(): string {
    const today = dayjs();
    const monday =
      today.day() === 0
        ? today.subtract(6, "day")
        : today.startOf("week").add(1, "day");
    return monday.format("YYYY-MM-DD");
  }

  function separateSessions(data: CallSession[]): {
    completedSessions: CallSession[];
    missedSessions: MissedCall[];
  } {
    const completedSessions: CallSession[] = [];
    const missedSessions: any[] = [];
    data.forEach((session) => {
      if (session.duration == 0) {
             const technicianName = session.technicianId
          ? `${session.technicianId.firstName || ""} ${
              session.technicianId.lastName || ""
            }`.trim()
          : "Not Taken";

        missedSessions.push({
          _id: session._id,
          userId: session.userId,
          technicianName,
          startedAt: session.startedAt,
          endedAt: session.endedAt,
          createdAt:session.createdAt,
        });
      } else {
        if (session.technicianId && session.technicianId._id) {
          completedSessions.push(session);
        }
      }
    });

    return { completedSessions, missedSessions };
  }
  function groupByTechnician(data: CallSession[]): TechnicianGroup[] {
    const grouped: Record<string, TechnicianGroup> = {};

    data.forEach((session) => {
      if (!session.technicianId || !session.technicianId._id) return;

      const techId = session.technicianId._id;
      const techName =
        `${session.technicianId.firstName || ""} ${
          session.technicianId.lastName || ""
        }`.trim() || "Unknown";

      if (!grouped[techId]) {
        grouped[techId] = {
          technicianId: techId,
          technicianName: techName,
          phone: session.technicianId.phone,
          sessions: [],
          totalDuration: 0,
        };
      }
      grouped[techId].sessions.push(session);
      grouped[techId].totalDuration += session.duration;
    });

    return Object.values(grouped);
  }

  function applyFilter() {
    const keyword = filterText.trim().toLowerCase();

    // Filter completed sessions
    if (!keyword) {
      setFiltered(sessions);
    } else {
      const filteredList = sessions.filter((group) => {
        return (
          group.technicianId.toLowerCase().includes(keyword) ||
          group.technicianName.toLowerCase().includes(keyword) ||
          (group.phone?.toLowerCase() || "").includes(keyword)
        );
      });
      setFiltered(filteredList);
    }

    // Filter missed calls
    if (!keyword) {
      setFilteredMissed(missedCalls);
    } else {
      const filteredMissedList = missedCalls.filter((call) => {
        return (
          call.userId.toLowerCase().includes(keyword) ||
          call.technicianName.toLowerCase().includes(keyword)
        );
      });
      setFilteredMissed(filteredMissedList);
    }
  }

  function formatDateTime(date: string) {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  }

  function formatTotal(seconds: number) {
    const minutes = (seconds / 60).toFixed(2);
    const hours = (seconds / 3600).toFixed(2);
    return `${seconds}s | ${minutes}min | ${hours}hr`;
  }

  const TabButton: React.FC<{
    tab: ActiveTab;
    label: string;
    count?: any;
    isActive: boolean;
  }> = ({ tab, label, count, isActive }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
        isActive
          ? "bg-green-900 text-white border-b-2 border-yellow-500"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label} ({count})
    </button>
  );

  const renderMissedCalls = () => (
    <div className="mt-6">
      {filteredMissed.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No missed calls found for the selected date or filter.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-collapse">
            <thead>
              <tr className="bg-red-700">
                <th className="border px-3 py-2">#No</th>
                <th className="border px-3 py-2">User ID</th>
                <th className="border px-3 py-2">Technician</th>
                <th className="border px-3 py-2">Call Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredMissed.map((call, idx) => (
                <tr key={call._id} className="hover:bg-red-25">
                  <td className="border px-3 py-2">{idx + 1}</td>
                  <td className="border px-3 py-2">{call.userId}</td>
                  <td className="border px-3 py-2">{call.technicianName}</td>
                  <td className="border px-3 py-2">
                    {formatDateTime(call.createdAt)}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderCompletedSessions = () => (
    <div className="mt-6">
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
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          No completed sessions found for the selected date or filter.
        </p>
      ) : (
        filtered.map((group) => (
          <div key={group.technicianId} className="mb-10">
            <h3 className="font-bold text-lg mb-2">
              {group.technicianName} ({group.phone || "No phone"}) — Total:{" "}
              {formatTotal(group.totalDuration)}
            </h3>
            <div className="overflow-x-auto">
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
                      <td className="border px-3 py-2">
                        {formatDateTime(session.startedAt)}
                      </td>
                      <td className="border px-3 py-2">
                        {formatDateTime(session.endedAt)}
                      </td>
                      <td className="border px-3 py-2">{session.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Call Session Reports</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1">Filter by Technician</label>
          <input
            type="text"
            placeholder="Name, ID, or phone"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b">
        <TabButton
          tab="completed"
          label="Completed Sessions"
          count={"VFY"}
          isActive={activeTab === "completed"}
        />
        <TabButton
          tab="missed"
          label="Missed Calls"
          count={filteredMissed.length}
          isActive={activeTab === "missed"}
        />
      </div>
      {activeTab === "completed"
        ? renderCompletedSessions()
        : renderMissedCalls()}
    </div>
  );
};

export default CallSessions;
