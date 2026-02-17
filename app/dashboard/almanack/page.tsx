"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAlmanackEntries, deleteAlmanackEntry, AlmanackEntry } from "@/lib/almanack";
import { motion } from "framer-motion";
import { BookOpen, Plus, Trash2, Edit, Calendar } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/Modal";

export default function AlmanackArchivePage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<AlmanackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<AlmanackEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const data = await getAlmanackEntries(user!.id);
      setEntries(data);
    } catch (error) {
      toast.error("Failed to load almanack entries");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    try {
      await deleteAlmanackEntry(entryId);
      setEntries(entries.filter((e) => e.id !== entryId));
      toast.success("Entry deleted successfully");
    } catch (error) {
      toast.error("Failed to delete entry");
      console.error(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-[8px]">ALMANACK</h1>
          <p className="text-neutral-500 mt-2">Your trading journal & insights</p>
        </div>
        <button
          onClick={() => {
            setSelectedEntry(null);
            setIsModalOpen(true);
          }}
          className="bg-white text-black p-3 rounded-xl hover:bg-neutral-200 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Entries List */}
      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-12 text-center"
        >
          <BookOpen className="mx-auto text-neutral-600 mb-4" size={48} />
          <h3 className="text-white font-semibold text-lg mb-2">
            No entries yet
          </h3>
          <p className="text-neutral-500 mb-6">
            Start documenting your trading journey and insights
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black py-2 px-6 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Create Your First Entry
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-neutral-950/65 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {entry.title}
                  </h3>
                  {entry.symbol && (
                    <span className="inline-block bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded">
                      {entry.symbol}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedEntry(entry);
                      setIsModalOpen(true);
                    }}
                    className="text-neutral-400 hover:text-white transition-colors p-2"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-neutral-400 hover:text-red-400 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-neutral-300 mb-4 line-clamp-3">
                {entry.content}
              </p>
              <div className="flex items-center text-neutral-500 text-sm">
                <Calendar size={14} className="mr-1" />
                {formatDate(entry.created_at)}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Entry Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEntry(null);
        }}
        title={selectedEntry ? "Edit Entry" : "New Entry"}
      >
        <div className="space-y-4">
          <p className="text-neutral-400">Entry creation form coming soon...</p>
        </div>
      </Modal>
    </div>
  );
}
