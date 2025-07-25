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
    <header className="bg-white shadow-md">
      <div className="bg-secondary p-3">
        <h1 className="text-center font-bold text-sm md:text-lg">
          {lang === 'en'
            ? 'For any assistance call directly'
            : 'Wifuza ubufasha bwihuse waduhamagara kuri'}
          <Link to="tel:+250782986810" className="text-white">
            {' '}
            (250) 782986810
          </Link>
        </h1>
      </div>

      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className=''>
          <Link to="/" className="text-primary text-xl md:text-2xl font-bold">
            Fixo
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
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
          <ul className="flex gap-6 font-bold">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                {lang === 'en' ? 'HOME' : 'AHABANZA'}
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                {lang === 'en' ? 'SERVICES' : 'SERIVISE'}
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                {lang === 'en' ? 'PRODUCTS' : 'IBICURUZWA'}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                {lang === 'en' ? 'CONTACT US' : 'TWANDIKIRE'}
              </Link>
            </li>
          </ul>

          <div className="bg-primary p-2 px-4 rounded text-white hover:bg-primary-dark transition duration-300">
          <Link to="/direct-support">
                  <button>
                    {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
                  </button>
                  </Link>
          </div>

          {/* Language Switcher Button */}
          <button
            onClick={handleLanguageSwitch}
            className="flex items-center gap-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
          >
            <img
              src={
                lang === 'en'
                  ? 'https://flagcdn.com/rw.svg'
                  : 'https://flagcdn.com/us.svg'
              }
              alt={lang === 'en' ? 'Kinyarwanda flag' : 'English flag'}
              className="w-6 h-4"
            />
            <span>{lang === 'en' ? 'Kinyarwanda' : 'English'}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 right-0 bg-white shadow-lg z-50">
            <ul className="flex flex-col items-center gap-4 p-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary transition duration-300"
                  onClick={toggleMenu}
                >
                  {lang === 'en' ? 'Home' : 'Ahabanza'}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-700 hover:text-primary transition duration-300"
                  onClick={toggleMenu}
                >
                  {lang === 'en' ? 'Services' : 'Serivise'}
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-primary transition duration-300"
                  onClick={toggleMenu}
                >
                  {lang === 'en' ? 'Products' : 'Ibicuruzwa'}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-primary transition duration-300"
                  onClick={toggleMenu}
                >
                  {lang === 'en' ? 'Contact Us' : 'Twandikire'}
                </Link>
              </li>
              <li>
                <div className="bg-primary p-2 px-4 rounded text-white hover:bg-primary-dark transition duration-300">
                <Link to="/direct-support">
                  <button>
                    {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
                  </button>
                  </Link>
                </div>
              </li>
              <li>
                <button
                  onClick={handleLanguageSwitch}
                  className="flex items-center gap-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-300"
                >
                  <img
                    src={
                      lang === 'en'
                        ? 'https://flagcdn.com/rw.svg'
                        : 'https://flagcdn.com/us.svg'
                    }
                    alt={lang === 'en' ? 'Kinyarwanda flag' : 'English flag'}
                    className="w-6 h-4"
                  />
                  <span>{lang === 'en' ? 'Kinyarwanda' : 'English'}</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
