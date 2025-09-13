import {
  FaUsers,
  FaRocket,
  FaHeart,
  FaAward,
  FaGlobe,
  FaLightbulb,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";

const AboutSection = ({ lang }: { lang: string }) => {
  const content = {
    en: {
      title: "About Fixo",
      subtitle: "Bridging Digital Divide",
      description:
        "Fixo exists to play a role in Rwanda program NST II by removing the gap between those with access to technology, and digital literacy, and those without. We partner with government and private institutions to bring digital access and learning with assistance directly to communities, helping everyone explore, learn, and thrive in the digital world.",
      mission: "Our Mission",
      missionText:
        "To bridge the digital divide in Rwanda by providing access to technology,and digital literacy support assistance, ensuring every one can learn, connect, and thrive in the digital world.",
      vision: "Our Vision",
      visionText:
        "To create a Rwanda where technology, and digital skills are accessible to all, empowering every individual and community to participate fully in the digital world.",
      values: [
        {
          icon: FaUsers,
          title: "Citizen First",
          description:
            "We prioritize people and communities, ensuring everyone has access to technology and opportunities.",
        },
        {
          icon: FaRocket,
          title: "Innovation",
          description:
            "We continously embrace new ideas and creative solutions to bridge the digital divide.",
        },
        {
          icon: FaHeart,
          title: "Empathy",
          description:
            "We listen, understand, and respond to the real needs of the communities we serve with patience and care.",
        },
        {
          icon: FaAward,
          title: "Excellence",
          description:
            "We strive for the highest quality in everything we do, delivering reliable and impactful solutions.",
        },
      ],
      stats: [
        { number: "500+", label: "Happy Customers" },
        { number: "99%", label: "Success Rate" },
        { number: "24/7", label: "Support Available" },
        { number: "50+", label: "Expert Technicians" },
      ],
      teamTitle: "Why Choose Fixo?",
      teamFeatures: [
        {
          icon: FaGlobe,
          title: "Nationwide Coverage",
          description:
            "Serving all corners of Rwanda with our extensive network of certified technicians.",
        },
        {
          icon: FaLightbulb,
          title: "Instant Solutions",
          description:
            "Get immediate help through our Real time support session, no matter where you are.",
        },
        {
          icon: FaShieldAlt,
          title: "Secure & Trusted",
          description:
            "Your data and privacy are protected with enterprise-grade security measures.",
        },
        {
          icon: FaHandshake,
          title: "Local Expertise",
          description:
            "Our team understands local challenges and provides solutions in accordance to user needs.",
        },
      ],
    },
    rw: {
      title: "Ibyerekeye Fixo",
      subtitle: "Gukuraho icyuho mu ikoranabuhanga",
      description:"Fixo iriho kugira igire uruhare muri gahunda y'Igihugu yamajyambere (NST II) ikuraho icyuho kiri hagati y’abafite uburyo bwo gukoresha ikoranabuhanga,  n’abo batabufite. Dukorana na Leta ndetse nibigo byigenga tugafasha abaturage kubona ibikoresho, n’ubumenyi mu ikoranabuhangaaho aho bari hose kugira ngo buri wese abashe kwiga, akore  ndetse agere ku byo yifuza mu isi y'ikoranabuhanga.",
      mission:"Intego yacu",
      missionText:
        "Gukuraho icyuho mu ikoranabuhanga mu Rwanda, dutanga uburyo bwo gukoresha ibikoresho by'ikoranabuhanga, n’amahugurwa y’ubumenyi mu ikoranabuhanga, kugira ngo buri muturage wese abashe kwiga, gukora, no gutera imbere mu isi yikoranabuhanga.",
      vision: "Icyerekezo cyacu",
      visionText:
        "u Rwanda aho ikoranabuhanga, n’ubumenyi mu ikoranabuhanga bikoreshwa na buri wese kand neza, bigatuma buri muntu agira uruhare rwuzuye mu isi y'ikoranabuhanga nta mbogamizi.",
      values: [
        {
          icon: FaUsers,
          title: "Umuturage Kwisonga",
          description:
            "Twita k'umuturage aho ari hose duharanira ko abona kandi agakoresha ikoranabuhanga neza.",
        },
        {
          icon: FaRocket,
          title: "Guhanga udushya",
          description:
            "Duhora twakira ibitekerezo bishya mu gushaka ibisubizo birambye ku icyuho mu ikoranabuhanga.",
        },
        {
          icon: FaHeart,
          title: "Kumva abatugana",
          description:
            "Twumva, tukamenya, kandi tugatanga ibisubizo birambye ku abatugana bose.",
        },
        {
          icon: FaAward,
          title: "Indashyikirwa",
          description: "Duharanira kandi tugatanga ubuziranenge mu byo dukora byose, dutanga ibisubizo byizewe kandi birambye.",
        },
      ],
      stats: [
        { number: "500+", label: "Abakiriya Bishimye" },
        { number: "99%", label: "Abafashijwe banyuzwe" },
        { number: "24/7", label: "Ubufasha Buratangwa" },
        { number: "50+", label: "Abatekinisiye b'Inzobere" },
      ],
      teamTitle: "Kubera iki ukwiye guhitamo Fixo?",
      teamFeatures: [
        {
          icon: FaGlobe,
          title: "Dufasha  Igihugu cyose",
          description:
            "Dufasha mu Rwanda hose dufatanije n'abatekinisiye bizewe kandi bashoboye.",
        },
        {
          icon: FaLightbulb,
          title: "Ibisubizo byihuse",
          description:
            "Habwa ubufasha bwihuse aho uri hose, ukoresheje iyakure muri sisitemu yacu.",
        },
        {
          icon: FaShieldAlt,
          title: "Umutekano ku amakuru yawe",
          description:
            "Amakuru yawe abikwa neza, agakoreshwa mu kugufasha no kugushakira igisubizo kinoze.",
        },
        {
          icon: FaHandshake,
          title: "Tuzi neza aho dukorera",
          description:
            "abatekenisiye bazi ibibazo bikunze kubho, bityo amakuru bafite akoreshwa neza mugushaka ibisubizo birambye .",
        },
      ],
    },
  };

  const currentContent = content[lang === "rw" ? "rw" : "en"];

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
              {lang === "en" ? "Our Story" : "Inkuru yacu"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            {lang === 'en' ? 'Digital Access for All Rwandans' : 'Ikoranabuhanga ku Banyarwanda Bose'}
          </h1>

          <h3 className="text-xl md:text-2xl text-secondary font-semibold mb-6">
            {currentContent.subtitle}
          </h3>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-bold">
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
              <h3 className="text-2xl font-bold text-gray-900">
                {currentContent.mission}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-justify">
              {currentContent.missionText}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                <FaGlobe className="text-secondary text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {currentContent.vision}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-justify">
              {currentContent.visionText}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {lang === "en" ? "Our Core Values" : "Indangagaciro zacu"}
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
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-2xl p-8 mb-16 text-white">
          <h3 className="text-3xl font-bold text-center mb-8">
            {lang === "en" ? "Quarter expected impact" : "ibyo twiteze mu gihembwe"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentContent.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium opacity-90">
                  {stat.label}
                </div>
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
                <div className="w-16 h-16 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-secondary text-2xl" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
