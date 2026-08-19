import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = ({ lang }: { lang: string }) => {
  const quickLinks = [
    { path: '/', label: { en: 'Home', rw: 'Ahabanza' } },
    { path: '/services', label: { en: 'Services', rw: 'Serivisi' } },
    { path: '/products', label: { en: 'Products', rw: 'Ibicuruzwa' } },
    { path: '/resources', label: { en: 'Resources', rw: 'Amasomo' } },
    { path: '/trainings', label: { en: 'Trainings', rw: 'Amahugurwa' } },
    { path: '/contact', label: { en: 'Contact Us', rw: 'Twandikire' } },
    { path: '/login', label: { en: 'Sign In', rw: 'Injira' } },
  ];

  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
    { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
    { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  ];

  const contactDetails = [
    { icon: FaMapMarkerAlt, value: 'Makuza Peace Plaza, Kigali, Rwanda', href: null },
    { icon: FaPhone, value: '(250) 785 450 726', href: 'tel:+250785450726' },
    { icon: FaEnvelope, value: 'support@fixo.rw', href: 'mailto:support@fixo.rw' },
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="lg:col-span-2 max-w-sm">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Fixo" className="h-7 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed">
              {lang === 'en'
                ? 'We support Rwanda’s NST II by bridging the digital divide — connecting citizens to technology, digital literacy, and opportunities.'
                : 'Dufasha muri gahunda y’igihugu y’amajyambere (NST II) dukuraho icyuho mu ikoranabuhanga, duhuza abaturage n’ikoranabuhanga n’amahirwe.'}
            </p>

            <div className="flex items-center gap-3 mt-5">
              {socialMediaLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-900 transition-colors"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {lang === 'en' ? 'Quick links' : 'Amahuza yihuse'}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-slate-900 transition-colors"
                  >
                    {lang === 'en' ? link.label.en : link.label.rw}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              {lang === 'en' ? 'Contact' : 'Aho wadusanga'}
            </h3>
            <ul className="space-y-3">
              {contactDetails.map((detail) => (
                <li key={detail.value} className="flex items-start gap-2.5 text-sm">
                  <detail.icon className="w-3 h-3 mt-1 flex-shrink-0 text-slate-400" />
                  {detail.href ? (
                    <a href={detail.href} className="hover:text-slate-900 transition-colors">
                      {detail.value}
                    </a>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <Link
              to="/direct-support"
              className="inline-flex items-center gap-2 mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <FaPhone className="w-3 h-3" />
              {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Fixo.{' '}
            {lang === 'en' ? 'All rights reserved.' : 'Uburenganzira bwose bwitswe.'}
          </p>
          <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
            {lang === 'en' ? 'Privacy Policy' : 'Amabwiriza y’ibanga'}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
