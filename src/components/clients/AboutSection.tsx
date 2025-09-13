import { FaUsers, FaRocket, FaHeart, FaAward, FaGlobe, FaLightbulb, FaShieldAlt, FaHandshake } from 'react-icons/fa';

const AboutSection = ({ lang }: { lang: string }) => {
  const content = {
    en: {
      title: 'About Fixo',
      subtitle: 'Empowering Rwanda Through Technology',
      description: 'We are Rwanda\'s leading tech support platform, dedicated to bridging the digital divide and making technology accessible to everyone. Our mission is to provide instant, reliable, and affordable technical support to individuals and businesses across Rwanda.',
      mission: 'Our Mission',
      missionText: 'To democratize access to technology support, ensuring every Rwandan can confidently use digital tools and services.',
      vision: 'Our Vision',
      visionText: 'A digitally empowered Rwanda where technology barriers are eliminated and innovation thrives.',
      values: [
        {
          icon: FaUsers,
          title: 'Community First',
          description: 'We prioritize our community\'s needs and build lasting relationships with every customer.'
        },
        {
          icon: FaRocket,
          title: 'Innovation',
          description: 'We continuously innovate to provide cutting-edge solutions and stay ahead of technology trends.'
        },
        {
          icon: FaHeart,
          title: 'Empathy',
          description: 'We understand technology can be frustrating, so we approach every interaction with patience and care.'
        },
        {
          icon: FaAward,
          title: 'Excellence',
          description: 'We strive for excellence in every support session, ensuring the highest quality service.'
        }
      ],
      stats: [
        { number: '500+', label: 'Happy Customers' },
        { number: '99%', label: 'Success Rate' },
        { number: '24/7', label: 'Support Available' },
        { number: '50+', label: 'Expert Technicians' }
      ],
      teamTitle: 'Why Choose Fixo?',
      teamFeatures: [
        {
          icon: FaGlobe,
          title: 'Nationwide Coverage',
          description: 'Serving all corners of Rwanda with our extensive network of certified technicians.'
        },
        {
          icon: FaLightbulb,
          title: 'Instant Solutions',
          description: 'Get immediate help through our live video support system, no matter where you are.'
        },
        {
          icon: FaShieldAlt,
          title: 'Secure & Trusted',
          description: 'Your data and privacy are protected with enterprise-grade security measures.'
        },
        {
          icon: FaHandshake,
          title: 'Local Expertise',
          description: 'Our team understands local challenges and provides culturally relevant solutions.'
        }
      ]
    },
    rw: {
      title: 'Ibyerekeye Fixo',
      subtitle: 'Gushyigikira u Rwanda muri Tekinoloji',
      description: 'Nitwe twenyine tw\'ibanze mu gufasha muri tekinoloji mu Rwanda, dufite intego yo guhuza ikoranabuhanga no gufasha abantu bose gukoresha tekinoloji. Intego yacu ni ugutanga ubufasha bw\'ikoranabuhanga bugezweho, bwizerwa, kandi bwo ku giciro cy\'abantu bose n\'amashyirahamwe mu Rwanda.',
      mission: 'Intego yacu',
      missionText: 'Gufasha abantu bose gukoresha ubufasha bw\'ikoranabuhanga, kugira ngo Umurwanda wese ashobore gukoresha ibikoresho n\'amashyirahamwe y\'ikoranabuhanga mu cyizere.',
      vision: 'Icyerekezo cyacu',
      visionText: 'U Rwanda rushyigikiwe muri tekinoloji aho ibibazo by\'ikoranabuhanga bikurwaho kandi Indangagaciro\'ikoranabuhanga bukagira amahirwe.',
      values: [
        {
          icon: FaUsers,
          title: 'Umuryango w\'ibanze',
          description: 'Dushyira mu cyicaro ibyo umuryango ukeneye kandi dukomeza ubwiyunge n\'umukiriya wese.'
        },
        {
          icon: FaRocket,
          title: 'Inovasiyo',
          description: 'Dukomeza guhindura kugira ngo duteze imbere ibisubizo by\'ikoranabuhanga n\'imiterere y\'ikoranabuhanga.'
        },
        {
          icon: FaHeart,
          title: 'ukunva',
          description: 'Turazi ko tekinoloji irashobora gutera umutima, ni yo mpamvu tugerageza buri gikorwa .'
        },
        {
          icon: FaAward,
          title: 'Abimbere',
          description: 'duteza imbere ikoranabuhanga.'
        }
      ],
      stats: [
        { number: '500+', label: 'Abakiriya Bishimye' },
        { number: '99%', label: 'Ubwiyemezo bw\'Intsinzi' },
        { number: '24/7', label: 'Ubufasha Birashoboka' },
        { number: '50+', label: 'Abatekinisiye b\'Inzobere' }
      ],
      teamTitle: 'Kuki wihitamo Fixo?',
      teamFeatures: [
        {
          icon: FaGlobe,
          title: 'Gufasha mu Rwanda',
          description: 'Dufasha mu Rwanda rwose dufite urugaga rw\'abatekinisiye.'
        },
        {
          icon: FaLightbulb,
          title: 'Ibisubizo byihuse',
          description: 'Habwa ubufasha bugezweho ku giti cye muri sisiteme yacu y\'ubufasha bwo mu maso, aho uri hose.'
        },
        {
          icon: FaShieldAlt,
          title: 'Umutekano n\'Uwizigirwa',
          description: 'Amakuru yawe n\'Indangagaciro\'ikoranabuhanga birinzwe n\'Indangagaciro\'ikoranabuhanga.'
        },
        {
          icon: FaHandshake,
          title: 'Indangagaciro\'Abantu',
          description: 'Ikipe yacu irazirikana ibibazo by\'abantu kandi itanga ibisubizo by\'ikoranabuhanga.'
        }
      ]
    }
  };

  const currentContent = content[lang === 'rw' ? 'rw' : 'en'];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-secondary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-primary/15 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 mb-6">
            <FaUsers className="text-secondary text-lg" />
            <span className="text-secondary font-semibold">
              {lang === 'en' ? 'Our Story' : 'Inkuru yacu'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentContent.title}
          </h2>
          
          <h3 className="text-xl md:text-2xl text-secondary font-semibold mb-6">
            {currentContent.subtitle}
          </h3>
          
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {currentContent.description}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <FaRocket className="text-secondary text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentContent.mission}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{currentContent.missionText}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <FaGlobe className="text-primary text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentContent.vision}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{currentContent.visionText}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {lang === 'en' ? 'Our Core Values' : 'Indangagaciro zacu'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-secondary text-2xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-secondary to-secondaryDark rounded-2xl p-8 mb-16 text-white">
          <h3 className="text-3xl font-bold text-center mb-8">
            {lang === 'en' ? 'Our Impact' : 'Icyerekezo cyacu'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 animate-pulse-glow">
                  {stat.number}
                </div>
                <div className="text-lg font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Fixo */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {currentContent.teamTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.teamFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-primary text-2xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {lang === 'en' ? 'Ready to Get Started?' : 'Witeguye Gutangira?'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {lang === 'en' 
                ? 'Join thousands of satisfied customers who trust Fixo for their tech support needs.'
                : 'Wongere ku bakiriya benshi bishimye bizeye Fixo mu byo bakeneye ubufasha bw\'ikoranabuhanga.'
              }
            </p>
            <button className="bg-secondary hover:bg-secondaryDark text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-glow">
              {lang === 'en' ? 'Get Support Now' : 'Habwa Ubufasha Ubu'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
