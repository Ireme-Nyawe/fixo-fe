import { useEffect, useState } from 'react';

interface LanguageSelectorProps {
  forceShowModal?: boolean;
}

const LanguageSelector = ({ forceShowModal = false }: LanguageSelectorProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (!lang) {
      setShowModal(true);
    }
  }, [forceShowModal]);

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem('lang', lang);
    location.reload();
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-300 p-4">
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-xl text-center max-w-sm w-full animate-in zoom-in-95 duration-300">
            {/* Header Section */}
            <div className="mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Choose Language</h2>
              <p className="text-gray-600 text-sm sm:text-base">Select your preferred language</p>
            </div>

            {/* Language Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleLanguageSelect('en')}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] group"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src="https://flagcdn.com/us.svg"
                      alt="English"
                      className="w-8 h-6 sm:w-10 sm:h-7 rounded shadow-sm"
                    />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-blue-700">English</span>
                    <p className="text-xs sm:text-sm text-gray-500">United States</p>
                  </div>
                </div>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => handleLanguageSelect('rw')}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] group"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src="https://flagcdn.com/rw.svg"
                      alt="Kinyarwanda"
                      className="w-8 h-6 sm:w-10 sm:h-7 rounded shadow-sm"
                    />
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-green-700">Kinyarwanda</span>
                    <p className="text-xs sm:text-sm text-gray-500">Rwanda</p>
                  </div>
                </div>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">
                You can change this anytime in your profile
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageSelector;
