import { FaPhoneAlt } from 'react-icons/fa';

const HeroSection = ({ lang }: any) => {
  return (
    <div
      className="relative h-screen flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url('https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png')`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {lang === 'en' ? (
              <p>
                Fast tech help,
                <br />
                Any where,
                <br />
                Everytime
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

          <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition duration-300">
            <FaPhoneAlt className="text-lg" />
            <span className="text-lg">
              {lang === 'en' ? 'Call Now' : 'Saba ubufasha'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
