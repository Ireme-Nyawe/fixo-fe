import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = ({ lang }: any) => {
  const quickLinks = [
    { path: '/', label: { en: 'Home', rw: 'Ahabanza' } },
    { path: '/services', label: { en: 'Services', rw: 'Serivisi' } },
    { path: '/products', label: { en: 'Products', rw: 'Ibicuruzwa' } },
    { path: '/contact', label: { en: 'Contact Us', rw: 'Twandikire' } },
  ];

  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
    { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
    { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          <div>
            <Link
              to="/"
              className="text-3xl font-bold tracking-wide text-white"
            >
              Fixo
            </Link>
            <p className="mt-6 text-sm leading-relaxed">
              {lang === 'en'
                ? 'Your one-stop destination for expert technical support.'
                : 'Aho wakora ibibazo byawe bya tekinike.'}
            </p>
          </div>

          <nav aria-label="Quick Links">
            <h3 className="text-lg font-semibold mb-6">
              {lang === 'en' ? 'Quick Links' : 'Amahuza yihuse'}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-secondary transition duration-300 block"
                  >
                    {lang === 'en' ? link.label.en : link.label.rw}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-lg font-semibold mb-6">
              {lang === 'en' ? 'Follow Us' : 'Dukurikire'}
            </h3>
            <div className="flex space-x-6">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:text-secondary transition duration-300"
                >
                  <social.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

          <address>
            <h3 className="text-lg font-semibold mb-6">
              {lang === 'en' ? 'Contact Us' : 'Twandikire'}
            </h3>
            <p className="text-sm">
              {lang === 'en'
                ? 'Email: support@fixo.com'
                : 'Imeli: support@fixo.com'}
            </p>
            <p className="text-sm">
              {lang === 'en'
                ? 'Phone: +250 781 234 567'
                : 'Telefone: +250 781 234 567'}
            </p>
          </address>
        </div>

        <div className="text-center border-t border-white-600 pt-8">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Fixo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
