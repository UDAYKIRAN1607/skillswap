// src/pages/ExchangeRequests.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";

type Exchange = {
  _id: string;
  sender?: { name: string; email: string };
  receiver?: { name: string; email: string };
  senderSkill?: { title: string; category: string; level: string };
  receiverSkill?: { title: string; category: string; level: string };
  message: string;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  accepted: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  rejected: "text-red-400 bg-red-400/10 border-red-400/20",
  completed: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
};

const ExchangeRequests: React.FC = () => {
  const [sent, setSent] = useState<Exchange[]>([]);
  const [received, setReceived] = useState<Exchange[]>([]);
  const [tab, setTab] = useState<"received" | "sent">("received");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchExchanges = async () => {
    try {
      setLoading(true);
      const res = await api.get("/exchanges/my");
      setSent(res.data.sent);
      setReceived(res.data.received);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExchanges(); }, []);

  const handleStatus = async (id: string, status: string) => {
    try {
      setUpdatingId(id);
      await api.put(`/exchanges/${id}/status`, { status });
      fetchExchanges();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setUpdatingId(id);
      await api.delete(`/exchanges/${id}`);
      fetchExchanges();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const ExchangeCard = ({ exchange, isSent }: { exchange: Exchange; isSent: boolean }) => (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-slate-500">{isSent ? "To: " : "From: "}</span>
          <span className="text-slate-100 font-semibold">
            {isSent ? exchange.receiver?.name : exchange.sender?.name}
          </span>
        </div>
        <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${statusStyles[exchange.status]}`}>
          {exchange.status}
        </span>
      </div>

      {/* Skills exchange */}
      <div className="grid grid-cols-3 gap-3 items-center">
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3">
          <p className="text-xs text-indigo-400 font-semibold mb-1">{isSent ? "YOUR SKILL" : "THEIR SKILL"}</p>
          <p className="text-sm font-bold text-slate-100">{exchange.senderSkill?.title}</p>
          <p className="text-xs text-slate-500">{exchange.senderSkill?.category}</p>
        </div>
        <div className="text-center text-indigo-400 text-xl font-bold">⇄</div>
        <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-3">
          <p className="text-xs text-sky-400 font-semibold mb-1">{isSent ? "THEIR SKILL" : "YOUR SKILL"}</p>
          <p className="text-sm font-bold text-slate-100">{exchange.receiverSkill?.title}</p>
          <p className="text-xs text-slate-500">{exchange.receiverSkill?.category}</p>
        </div>
      </div>

      {/* Message */}
      {exchange.message && (
        <p className="text-sm text-slate-400 italic bg-slate-800/50 rounded-lg px-3 py-2">
          "{exchange.message}"
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        {!isSent && exchange.status === "pending" && (
          <>
            <button
              disabled={updatingId === exchange._id}
              onClick={() => handleStatus(exchange._id, "accepted")}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-all disabled:opacity-50"
            >
              ✓ Accept
            </button>
            <button
              disabled={updatingId === exchange._id}
              onClick={() => handleStatus(exchange._id, "rejected")}
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 transition-all disabled:opacity-50"
            >
              ✕ Reject
            </button>
          </>
        )}
        {exchange.status === "accepted" && (
          <button
            disabled={updatingId === exchange._id}
            onClick={() => handleStatus(exchange._id, "completed")}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 hover:bg-indigo-400/20 transition-all disabled:opacity-50"
          >
            ✦ Mark Complete
          </button>
        )}
        {isSent && exchange.status === "pending" && (
          <button
            disabled={updatingId === exchange._id}
            onClick={() => handleDelete(exchange._id)}
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-red-400 bg-red-400/10 border border-red-400/20 hover:bg-red-400/20 transition-all disabled:opacity-50"
          >
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );

  const current = tab === "sent" ? sent : received;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        <div>
          <h1 className="text-3xl font-extrabold text-slate-100">Exchanges</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage your skill exchange requests</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["received", "sent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {t === "received" ? `Received (${received.length})` : `Sent (${sent.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-16">Loading...</div>
        ) : current.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-slate-700 text-slate-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No {tab} exchange requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {current.map((ex) => (
              <ExchangeCard key={ex._id} exchange={ex} isSent={tab === "sent"} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRequests;