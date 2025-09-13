import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaShieldAlt, FaHeart, FaRocket } from 'react-icons/fa';

const Footer = ({ lang }: { lang: string }) => {
  const quickLinks = [
    { path: '/', label: { en: 'Home', rw: 'Ahabanza' } },
    { path: '/services', label: { en: 'Services', rw: 'Serivisi' } },
    { path: '/products', label: { en: 'Products', rw: 'Ibicuruzwa' } },
    { path: '/contact', label: { en: 'Contact Us', rw: 'Twandikire' } },
    { path: '/login', label: { en: 'Sign In', rw: 'Injira' } },
  ];

  const supportLinks = [
    { path: '/privacy-policy', label: { en: 'Privacy Policy', rw: 'Politiki y\'Ubwoba' } },
    { path: '/terms-of-service', label: { en: 'Terms of Service', rw: 'Amabwiriza ya Serivisi' } },
    { path: '/support', label: { en: 'Support Center', rw: 'Ikigo cy\'Ubufasha' } },
    { path: '/faq', label: { en: 'FAQ', rw: 'Ibibazo Bibazwa Kenshi' } },
  ];

  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-400' },
    { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter', color: 'hover:text-blue-300' },
    { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
  ];

  const features = [
    { icon: FaShieldAlt, text: { en: 'Secure & Reliable', rw: 'Umutekano n\'Uwizigirwa' } },
    { icon: FaClock, text: { en: '24/7 Support', rw: 'Ubufasha 24/7' } },
    { icon: FaRocket, text: { en: 'Fast Response', rw: 'Gusubiza vuba' } },
    { icon: FaHeart, text: { en: 'Customer First', rw: 'Umukiriya w\'ibanze' } },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-secondary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-primary/15 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link
                to="/"
                className="text-3xl font-bold tracking-wide text-white mb-4 inline-block"
              >
                Fixo
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {lang === 'en'
                  ? 'Your trusted partner for expert technical support. We solve your tech problems quickly and efficiently, so you can focus on what matters most.'
                  : "Umufatanyabikorwa wizigirwa wawe wo gufasha muri tekinoloji. Dukemura ibibazo byawe by\'ikoranabuhanga vuba kandi neza, kugira ngo wongere uhinduke ku byo bikunze."}
              </p>
              
              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300 text-sm">
                    <feature.icon className="text-secondary text-sm" />
                    <span>{lang === 'en' ? feature.text.en : feature.text.rw}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                {lang === 'en' ? 'Quick Links' : 'Amahuza yihuse'}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-secondary transition-colors duration-300 block text-sm"
                    >
                      {lang === 'en' ? link.label.en : link.label.rw}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                {lang === 'en' ? 'Support' : 'Ubufasha'}
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-secondary transition-colors duration-300 block text-sm"
                    >
                      {lang === 'en' ? link.label.en : link.label.rw}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                {lang === 'en' ? 'Contact Info' : 'Amakuru yo Twandikire'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaMapMarkerAlt className="text-secondary text-sm" />
                  <span>Makuza Peace Plaza, Kigali, Rwanda</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaPhone className="text-secondary text-sm" />
                  <span>(250) 785 450 726</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaEnvelope className="text-secondary text-sm" />
                  <span>support@fixo.rw</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <FaClock className="text-secondary text-sm" />
                  <span>{lang === 'en' ? 'Mon - Fri: 6:00 AM - 10:00 PM' : 'Ku wa Gatanu: 6:00 AM - 10:00 PM'}</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white mb-4">
                  {lang === 'en' ? 'Follow Us' : 'Dukurikire'}
                </h4>
                <div className="flex space-x-4">
                  {socialMediaLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl p-8 mb-12 border border-secondary/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {lang === 'en' ? 'Stay Updated' : 'Menya Amakuru'}
              </h3>
              <p className="text-gray-300 mb-6">
                {lang === 'en' 
                  ? 'Get the latest tech tips and updates delivered to your inbox.'
                  : 'Habwa amakuru y\'ikoranabuhanga n\'amakuru y\'ikoranabuhanga yoherezwa mu sanduku yawe y\'imeli.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={lang === 'en' ? 'Enter your email' : 'Andika imeyili yawe'}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
                <button className="bg-secondary hover:bg-secondaryDark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                  {lang === 'en' ? 'Subscribe' : 'Kwiyandikisha'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  &copy; {new Date().getFullYear()} Fixo. {lang === 'en' ? 'All rights reserved.' : 'Uburenganzira bwose burabitswe.'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-secondary transition-colors duration-300">
                  {lang === 'en' ? 'Privacy Policy' : 'Politiki y\'Ubwoba'}
                </Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-secondary transition-colors duration-300">
                  {lang === 'en' ? 'Terms of Service' : 'Amabwiriza ya Serivisi'}
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-secondary transition-colors duration-300">
                  {lang === 'en' ? 'Cookie Policy' : 'Politiki y\'Amakuki'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
