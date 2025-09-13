import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = localStorage.getItem('lang') || 'en';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageSwitch = () => {
    const newLang = lang === 'en' ? 'rw' : 'en';
    localStorage.setItem('lang', newLang);

    window.location.reload();
  };

  return (
    <header className="bg-secondary shadow-lg">
      <div className="bg-primary p-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-center font-medium text-base relative z-10 flex items-center justify-center gap-2">
            <span className="inline-flex items-center text-white text-sm sm:text-base">
              {lang === 'en'
                ? '24/7 Tech Support - Call Now'
                : 'Wifuza ubufasha bwihuse waduhamagara kuri'}
            </span>
            <Link
              to="tel:+250785 450 726"
              className="text-white inline-flex items-center hover:text-yellow-300 transition-colors duration-300 text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (250) 785 450 726
            </Link>
          </h1>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-white text-xl font-bold hover:text-primary transition-colors duration-300">
              Fixo
            </span>
          </Link>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            title='Toggle menu'
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'
                }
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 font-medium text-base">
            <li>
              <Link
                to="/"
                className="text-white hover:text-primary transition duration-300 flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{lang === 'en' ? 'Home' : 'Ahabanza'}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-white hover:text-primary transition duration-300 flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                <span>{lang === 'en' ? 'About Us' : 'Abo turi bo'}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-white hover:text-primary transition duration-300 flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>{lang === 'en' ? 'Digital Access' : 'Ibikoresho'}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-primary transition duration-300 flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{lang === 'en' ? 'Contact' : 'Twandikire'}</span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/direct-support"
              className="group relative overflow-hidden bg-primary hover:bg-primary-dark px-6 py-3 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2 text-base text-white font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
              </div>
            </Link>

            {/* Language Switcher Button */}
            <button
              onClick={handleLanguageSwitch}
              className="flex items-center gap-2 py-2 px-4 bg-opacity-20 bg-white backdrop-blur-sm rounded-md hover:bg-opacity-30 transition duration-300 text-base text-white"
            >
              <img
                src={
                  lang === 'en'
                    ? 'https://flagcdn.com/rw.svg'
                    : 'https://flagcdn.com/us.svg'
                }
                alt={lang === 'en' ? 'Kinyarwanda flag' : 'English flag'}
                className="w-5 h-4"
              />
              <span className="font-medium">{lang === 'en' ? 'Kinyarwanda' : 'English'}</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-secondary bg-opacity-95 z-50">
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-4">
                <button
                  onClick={toggleMenu}
                  className="text-white hover:text-primary transition-colors duration-300"
                  title="Close menu"
                  aria-label="Close menu"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col items-center gap-6 p-6 text-base">
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary transition duration-300 flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {lang === 'en' ? 'Home' : 'Ahabanza'}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-white hover:text-primary transition duration-300 flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                    {lang === 'en' ? 'About Us' : 'Abo turi bo'}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-white hover:text-primary transition duration-300 flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {lang === 'en' ? 'Digital Access' : 'Ibikoresho'}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-white hover:text-primary transition duration-300 flex items-center gap-2"
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {lang === 'en' ? 'Contact' : 'Twandikire'}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/direct-support"
                    className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-md shadow-lg text-white flex items-center gap-2 transform hover:scale-105 transition-all duration-300 animate-pulse"
                    onClick={toggleMenu}
                  >
                    <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLanguageSwitch}
                    className="flex items-center gap-2 py-2 px-4 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition duration-300 text-base text-white"
                  >
                    <img
                      src={
                        lang === 'en'
                          ? 'https://flagcdn.com/rw.svg'
                          : 'https://flagcdn.com/us.svg'
                      }
                      alt={lang === 'en' ? 'Kinyarwanda flag' : 'English flag'}
                      className="w-5 h-4"
                    />
                    <span>{lang === 'en' ? 'Kiny' : 'En'}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
