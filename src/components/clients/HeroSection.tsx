import { FaPhoneAlt, FaHeadset, FaClock, FaShieldAlt, FaUsers, FaStar } from 'react-icons/fa';
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-4 py-2 mb-6">
            <FaHeadset className="text-secondary text-sm" />
            <span className="text-secondary text-sm font-medium">
              {lang === 'en' ? '24/7 Expert Support' : 'Ubufasha bwizewe 24/7'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
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
                <span className="text-secondary"> Igihe Cyose</span>
              </>
            )}
           <br />
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            {lang === 'en' 
              ? "Get instant help from certified technicians. We solve your tech issues quickly and efficiently ."
              : "Habwa ubufasha nabatekinisiye bemewe. Dukemura ibibazo byawe mu ikoranabuhanga vuba kandi neza."
            }
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 text-white/90">
              <FaClock className="text-secondary text-lg" />
              <span className="text-sm font-medium">
                {lang === 'en' ? 'Instant Response' : 'Tukwakira byihuse'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <FaShieldAlt className="text-secondary text-lg" />
              <span className="text-sm font-medium">
                {lang === 'en' ? 'Secure & Reliable' : 'Umutekano usesuye'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <FaUsers className="text-secondary text-lg" />
              <span className="text-sm font-medium">
                {lang === 'en' ? 'Expert Technicians' : 'Abatekinisiye bashoboye'}
              </span>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link to="/direct-support">
              <button className="group relative bg-secondary hover:bg-secondaryDark text-white font-semibold py-4 px-8 rounded-xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow">
                <FaPhoneAlt className="text-xl group-hover:animate-bounce" />
                <span className="text-lg">
                  {lang === 'en' ? 'Call Now' : 'Saba ubufasha'}
                </span>
                <div className="absolute inset-0 bg-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </Link>
            
            <div className="flex items-center gap-2 text-white/80">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <span className="text-sm font-medium">
                {lang === 'en' ? '4.9/5' : '4.9/5 '}
              </span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-20 pt-20 flex flex-wrap items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>{lang === 'en' ? '500+ Happy Customers' : '500+ Abakiriya Bishimye'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>{lang === 'en' ? '99% Success Rate' : '99% Baranyuzwe'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>{lang === 'en' ? '24/7 Available' : '24/7 Turaboneka'}</span>
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
