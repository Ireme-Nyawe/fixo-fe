import { useEffect, useState } from 'react';

const LanguageSelector = ({ forceShowModal = false }: any) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (!lang) {
      setShowModal(true);
    }
  }, [forceShowModal]);

  const handleLanguageSelect = (lang: any) => {
    localStorage.setItem('lang', lang);
    location.reload();
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Choose Your Language</h2>
            <p className="mb-6">Please select your preferred language:</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleLanguageSelect('en')}
                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                <img
                  src="https://flagcdn.com/us.svg"
                  alt="English"
                  className="w-16 h-12 mb-2"
                />
                <span className="text-lg font-semibold">English</span>
              </button>
              <button
                onClick={() => handleLanguageSelect('rw')}
                className="flex flex-col items-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 transition duration-300"
              >
                <img
                  src="https://flagcdn.com/rw.svg"
                  alt="Kinyarwanda"
                  className="w-16 h-12 mb-2"
                />
                <span className="text-lg font-semibold">Kinyarwanda</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageSelector;
