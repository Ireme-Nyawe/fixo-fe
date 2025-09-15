import {
  FaPhoneAlt,
  FaHeadset,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaStar,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = ({ lang }: { lang: string }) => {
  return (
    <div
      className="relative h-screen flex items-center justify-start bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('/hero-bg.png')`,
      }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/30 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-primary/25 rounded-full animate-bounce-gentle"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20 md:pt-0">
        <div className="max-w-3xl">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-3 py-1 mb-4 sm:px-4 sm:py-2 sm:mb-6">
            <FaHeadset className="text-secondary text-xs sm:text-sm" />
            <span className="text-secondary text-xs sm:text-sm font-medium">
              {lang === 'en' ? '24/7 Expert Support' : 'Ubufasha bwizewe 24/7'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-snug sm:leading-tight">
            {lang === 'en' ? (
              <>
                <span className="text-secondary">Fast</span> Tech Support,
                <br />
                <span className="text-secondary">Anywhere</span>,
                <span className="text-secondary">Anytime</span>
              </>
            ) : (
              <>
                <span className="text-secondary">Ubufasha</span> bwihuse,
                <br />
                <span className="text-secondary">Aho uri hose</span>,
                <span className="text-secondary"> Igihe cyose</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 sm:mb-8 max-w-xl leading-relaxed">
            {lang === 'en'
              ? 'Instant help from certified technicians. Fast & reliable solutions.'
              : 'Habwa ubufasha nabatekinisiye bemewe vuba kandi neza.'}
          </p>

          {/* Features (hide some on mobile to save space) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 text-white/90">
              <FaClock className="text-secondary text-lg" />
              <span className="text-sm font-medium">
                {lang === 'en' ? 'Instant Response' : 'Tukwakira byihuse'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-white/90">
              <FaShieldAlt className="text-secondary text-lg" />
              <span className="text-sm font-medium">
                {lang === 'en' ? 'Secure & Reliable' : 'Umutekano usesuye'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-white/90">
              <FaUsers className="text-secondary text-lg" />
              <span className="text-sm font-medium">
                {lang === 'en'
                  ? 'Expert Technicians'
                  : 'Abatekinisiye bashoboye'}
              </span>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-6">
            <Link to="/direct-support">
              <button className="group relative bg-secondary hover:bg-secondaryDark text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow">
                <FaPhoneAlt className="text-lg sm:text-xl group-hover:animate-bounce" />
                <span className="text-base sm:text-lg">
                  {lang === 'en' ? 'Call Now' : 'Saba ubufasha'}
                </span>
                <div className="absolute inset-0 bg-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </Link>

            <div className="flex items-center gap-2 text-white/80">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400 text-xs sm:text-sm"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium">
                {lang === 'en' ? '4.9/5' : '4.9/5 '}
              </span>
            </div>
          </div>

          {/* Trust indicators (only show on larger screens) */}
          <div className="hidden md:flex mt-16 pt-16 flex-wrap items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>
                {lang === 'en'
                  ? '500+ Happy Customers'
                  : '500+ Abakiriya Bishimye'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>
                {lang === 'en' ? '99% Success Rate' : '99% Baranyuzwe'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>
                {lang === 'en' ? '24/7 Available' : '24/7 Turaboneka'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
