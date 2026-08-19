import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  onAskLater: () => void;
}

export default function RatingModal({ isOpen, onClose, onSubmit, onAskLater }: RatingModalProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating !== null) {
      onSubmit(rating);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-slate-950/40" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute -top-1 -right-1 text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-1">Rate our support</h2>
            <p className="text-sm text-slate-600 mb-6">How did the session go?</p>

            <div className="flex justify-center items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="p-2 focus:outline-none transition-all duration-200"
                >
                  <Star 
                    size={30}
                    fill={(hoveredRating !== null ? value <= hoveredRating : value <= (rating || 0)) 
                      ? "#FFC107"
                      : "none"
                    }
                    color={(hoveredRating !== null ? value <= hoveredRating : value <= (rating || 0))
                      ? "#FFC107" 
                      : "#CBD5E1" 
                    }
                    className="transition-all duration-200"
                  />
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={rating === null}
                className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                  rating === null
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Submit
              </button>
              <button
                onClick={onAskLater}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Ask me later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}