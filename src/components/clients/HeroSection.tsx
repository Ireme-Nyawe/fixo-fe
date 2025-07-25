import { FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = ({ lang }: any) => {
  return (
    <div
      className="relative h-screen flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url('/hero-bg.png')`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {lang === 'en' ? (
              <p>
                Fast tech Support,
                <br />
                Anywhere,
                <br />
                Anytime
              </p>
            ) : (
              <p>
                Ubufasha bwihuse,
                <br />
                Aho uri hose,
                <br />
                Igihe Cyose
              </p>
            )}
          </h1>

          <Link to="/direct-support">
          <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition duration-300">
            <FaPhoneAlt className="text-lg" />
            <span className="text-lg">
              {lang === 'en' ? 'Call Now' : 'Saba ubufasha'}
            </span>
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
