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
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 z-10">
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Rate Our Support</h2>

            <div className="flex justify-center items-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(null)}
                  className="p-2 focus:outline-none transition-all duration-200"
                >
                  <Star 
                    size={40}
                    fill={(hoveredRating !== null ? value <= hoveredRating : value <= (rating || 0)) 
                      ? "#FFC107"
                      : "none"
                    }
                    color={(hoveredRating !== null ? value <= hoveredRating : value <= (rating || 0))
                      ? "#FFC107" 
                      : "#CBD5E0" 
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
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  rating === null 
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                Submit
              </button>
              <button
                onClick={onAskLater}
                className="px-6 py-2 bg-orange-100 text-orange-700 rounded-md font-medium hover:bg-orange-200 transition-colors"
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