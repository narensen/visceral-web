"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { getAllGuidePages, markPageCompleted, isPageCompleted } from "@/lib/financialGuide";

interface FinancialGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinancialGuideModal({ isOpen, onClose }: FinancialGuideModalProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pages = getAllGuidePages();
  const currentPage = pages[currentPageIndex];

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      markPageCompleted(currentPage.id);
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleClose = () => {
    if (currentPage) {
      markPageCompleted(currentPage.id);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-end md:items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="bg-neutral-950 border border-neutral-800 rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-white" size={24} />
                  <h2 className="text-white text-xl font-bold">Financial Guide</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {currentPage && (
                  <motion.div
                    key={currentPage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white text-2xl font-bold mb-6">
                      {currentPage.title}
                    </h3>
                    {currentPage.sections.map((section) => (
                      <div
                        key={section.id}
                        className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mb-4"
                      >
                        <h4 className="text-white font-semibold text-lg mb-3">
                          {section.title}
                        </h4>
                        <p className="text-neutral-300 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-neutral-800">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPageIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                <div className="flex gap-2">
                  {pages.map((page, index) => (
                    <button
                      key={page.id}
                      onClick={() => setCurrentPageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPageIndex
                          ? "bg-white w-8"
                          : isPageCompleted(page.id)
                          ? "bg-positive"
                          : "bg-neutral-700"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPageIndex === pages.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 transition-colors"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
