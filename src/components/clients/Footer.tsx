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

  const socialMediaLinks = [
    { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-400' },
    { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter', color: 'hover:text-blue-300' },
    { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400' },
    { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-500' },
  ];

  const features = [
    { icon: FaShieldAlt, text: { en: 'Secure & Reliable', rw: 'Umutekano n\'Uwizigirwa' } },
    { icon: FaClock, text: { en: '24/7 Support', rw: 'Ubufasha 24/7' } },
    { icon: FaRocket, text: { en: 'Fast Response', rw: 'ubufasha bwihuse' } },
    { icon: FaHeart, text: { en: 'Citizen First', rw: 'umuturage kw\'isonga' } },
  ];

  return (
    <footer className="relative bg-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-secondary/20 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-secondary/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-primary/15 rounded-full animate-float"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link
                to="/"
                className="text-3xl font-bold tracking-wide text-white mb-4 inline-block"
              >
                Fixo
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 text-justify">
                {lang === 'en'
                  ? 'We supports Rwanda’s NST II by bridging the digital divide — connecting citizens to technology, digital literacy, and opportunities. we bring access and learning directly to communities so everyone can explore, learn, and thrive.'
                  : "Dufasha muri gahunda y'igihugu y'amajyambere (NST II) dukuraho icyuho mu ikoranabuhanga —  Tubinyujije mu bufatanye na leta n’ibigo byigenga, dutanga uburyo n’amahugurwa ku baturage ngo buri wese abashe kubaho mu is y'ikoranabuhanga."}
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
              <h3 className="text-lg font-semibold text-white mb-6 flex justify-center items-center gap-2">
                {lang === 'en' ? 'Quick Links' : 'Amahuza yihuse'}
              </h3>
              <ul className="space-y-3 ">
                {quickLinks.map((link, index) => (
                  <li key={index} className='text-center'>
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

            <div>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                {lang === 'en' ? 'Contact Info' : 'Aho wadusanga'}
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
                  <span>{lang === 'en' ? '24/7 - all time' : '24/7 - igihe cyose'}</span>
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
          <div className="bg-primary rounded-2xl p-8 mb-12 border border-secondary/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {lang === 'en' ? 'Stay Updated' : 'Menya Amakuru'}
              </h3>
              <p className="text-gray-300 mb-6">
                {lang === 'en' 
                  ? 'Get the latest tech tips and updates delivered to your inbox.'
                  : 'Habwa amakuru mashya y\'ikoranabuhanga wakira ubutumwa kuri imeli yawe.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={lang === 'en' ? 'Enter your email' : 'Andika imeyili yawe'}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                />
                <button disabled className="bg-secondary  text-white font-semibold py-3 px-6 rounded-xl">
                  {lang === 'en' ? 'Subscribe' : 'iyandikishe'}
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
                  &copy; {new Date().getFullYear()} Fixo. {lang === 'en' ? 'All rights reserved.' : 'yemewe n\'amategeko.'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-secondary transition-colors duration-300">
                  {lang === 'en' ? 'Privacy Policy' : 'Amategeko n\'amabwiriza'}
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
