import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { to: '/', label: { en: 'Home', rw: 'Ahabanza' } },
  { to: '/services', label: { en: 'About Us', rw: 'Abo turi bo' } },
  { to: '/resources', label: { en: 'Resources', rw: 'Amasomo' } },
  { to: '/trainings', label: { en: 'Trainings', rw: 'Amahugurwa' } },
  { to: '/products', label: { en: 'Digital Access', rw: 'Ibikoresho' } },
  { to: '/contact', label: { en: 'Contact', rw: 'Twandikire' } },
];

const LanguageToggle = ({ lang }: { lang: string }) => {
  const switchTo = (next: string) => {
    if (next === lang) return;
    localStorage.setItem('lang', next);
    window.location.reload();
  };

  const optionClass = (option: string) =>
    `px-2 py-1 rounded-md text-xs font-semibold tracking-wide transition-colors ${
      lang === option
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-500 hover:text-slate-700'
    }`;

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5">
      <button
        type="button"
        onClick={() => switchTo('en')}
        className={optionClass('en')}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo('rw')}
        className={optionClass('rw')}
      >
        KIN
      </button>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = localStorage.getItem('lang') || 'en';

  const label = (item: (typeof navItems)[number]) =>
    lang === 'en' ? item.label.en : item.label.rw;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-slate-50 border-b border-slate-200 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-center gap-2 text-xs">
          <span className="hidden sm:inline">
            {lang === 'en'
              ? '24/7 tech support'
              : 'Ubufasha bwa tekinoloji 24/7'}
          </span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <Link
            to="tel:+250785450726"
            className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-primary transition-colors"
          >
            <FaPhoneAlt className="w-2.5 h-2.5" />
            (250) 785 450 726
          </Link>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-14 flex items-center justify-between gap-6">
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.png" alt="Fixo" className="h-6 w-auto" />
            </Link>

            <ul className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `text-sm transition-colors ${
                        isActive
                          ? 'text-slate-900 font-medium'
                          : 'text-slate-500 hover:text-slate-900'
                      }`
                    }
                  >
                    {label(item)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3">
              <LanguageToggle lang={lang} />
              <Link
                to="/direct-support"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <FaPhoneAlt className="w-3 h-3" />
                {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageToggle lang={lang} />
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label="Toggle menu"
                className="p-2 text-slate-700 hover:text-slate-900"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <ul className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block py-2.5 text-sm border-b border-slate-100 transition-colors ${
                        isActive
                          ? 'text-slate-900 font-medium'
                          : 'text-slate-600 hover:text-slate-900'
                      }`
                    }
                  >
                    {label(item)}
                  </NavLink>
                </li>
              ))}
              <li className="py-3">
                <Link
                  to="/direct-support"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  <FaPhoneAlt className="w-3 h-3" />
                  {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
