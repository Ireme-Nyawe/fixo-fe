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
    <section className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
            {lang === "en" ? "Our story" : "Inkuru yacu"}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {lang === "en"
              ? "Digital access for all Rwandans"
              : "Ikoranabuhanga ku Banyarwanda bose"}
          </h2>
          <p className="mt-2 text-sm font-medium text-primary">
            {currentContent.subtitle}
          </p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {currentContent.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {[
            {
              icon: FaRocket,
              title: currentContent.mission,
              text: currentContent.missionText,
            },
            {
              icon: FaGlobe,
              title: currentContent.vision,
              text: currentContent.visionText,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-colors"
            >
              <item.icon className="w-4 h-4 text-primary mb-3" />
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentContent.stats.map((stat, index) => (
              <div key={index}>
                <p className="text-2xl md:text-3xl font-semibold text-slate-900">
                  {stat.number}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-5">
            {lang === "en" ? "Our core values" : "Indangagaciro zacu"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentContent.values.map((value, index) => (
              <div key={index} className="border-t border-slate-200 pt-4">
                <value.icon className="w-4 h-4 text-primary mb-2.5" />
                <h4 className="text-sm font-semibold text-slate-900 mb-1.5">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-5">
            {currentContent.teamTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentContent.teamFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors"
              >
                <feature.icon className="w-4 h-4 text-primary mb-2.5" />
                <h4 className="text-sm font-semibold text-slate-900 mb-1.5">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
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
