import {
  FaDesktop,
  FaWifi,
  FaGraduationCap,
  FaTools,
  FaBuilding,
  FaLaptop,
  FaHandHoldingHeart,
  FaClock,
  FaUserTie,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FixoServicesSection = ({ lang }: { lang: string }) => {
  const partnershipModel = [
    {
      id: 1,
      icon: FaClock,
      title:
        lang === "en"
          ? "Our 24/7 Expert Technicians"
          : "Inzobere Zacu zikora 24/7",
      description:
        lang === "en"
          ? "Our certified technicians work around the clock, ready to help solve any tech-related issues through our system real-time communication and remote assistance."
          : "Inzobere zacu zikora mu gihe cyose, ziteguye gufasha gukemura ibibazo byose bijyanye na ikoranabuhanga hifashijwe iyakure ku rubuga rwacu.",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      icon: FaUserTie,
      title:
        lang === "en"
          ? "Private Partner Accounts"
          : "Konti z'abafatanyabikorwa",
      description:
        lang === "en"
          ? "We provide dedicated accounts to private technicians and companies, allowing them to support their clients through our comprehensive platform."
          : "Dutanga konti zihariye ku nzobere n'amasosiyete y'abikorera ku giti cyabo, bibafasha gufasha abakiriya babo bakoreseje sisitem yacu.",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      icon: FaBuilding,
      title:
        lang === "en" ? "Government Partnership" : "Ubufatanyabikorwa na leta",
      description:
        lang === "en"
          ? "We partner with government bodies to deliver support and assistance for various digital services, advancing Rwanda's digital transformation goals."
          : "Dufataanya na leta mu gutanga ubufasha mu serivise z'ikoranabuhanga zitandukanye, bigafasha mukunoza itangwa rya serivise no kwihutisha gahunda yigihugu y'amajyambere.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const digitalSkillsServices = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573498/photo_pqapzz.jpg",
      icon: FaDesktop,
      title:
        lang === "en"
          ? "Software Installation & Troubleshooting"
          : "Gushyira software no gukemura ibibazo",
      description:
        lang === "en"
          ? "Expert assistance with installing, configuring, and troubleshooting software through real-time remote sessions."
          : "Ubufasha bw'inzobere mu gushyiramo, gusuzuma, no gukemura ibibazo bya software mu biganiro by'iyakure.",
      features:
        lang === "en"
          ? [
              "Remote Installation",
              "System Configuration",
              "Software Updates",
              "Performance Tuning",
            ]
          : [
              "Gushyira iyakure",
              "Gusuzuma sisitemu",
              "Gushyira kugihe software",
              "Gutunganya imikorere",
            ],
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573516/pexels-thirdman-5327914_ele525.jpg",
      icon: FaTools,
      title:
        lang === "en"
          ? "Device Diagnostics & Optimization"
          : "Gusuzuma ibikoresho no kubitunganya",
      description:
        lang === "en"
          ? "Comprehensive system health checks, performance optimization, and security maintenance for all your devices."
          : "Gusuzuma kwuzuye ubuzima bwa sisitemu, gutunganya imikorere, no kubungabunga umutekano w'ibikoresho byawe byose.",
      features:
        lang === "en"
          ? [
              "Health Diagnostics",
              "Virus Removal",
              "Performance Boost",
              "Data Recovery",
            ]
          : [
              "Gusuzuma ubuzima",
              "Gukuraho virusi",
              "Gutera imbere",
              "kugarura amakuru",
            ],
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573509/pexels-brett-sayles-4508748_kwaqxi.jpg",
      icon: FaWifi,
      title:
        lang === "en"
          ? "Internet & Network Setup"
          : "Gushyiraho interineti n'imiyoboro yitumanaho",
      description:
        lang === "en"
          ? "Professional guidance for network configuration, connectivity issues, and internet optimization solutions."
          : "Ubuyobozi bw'abanyamwuga mu gusuzuma imiyoboro, gukemura ibibazo by'ihuza, n'ibisubizo byo gutunganya interineti.",
      features:
        lang === "en"
          ? [
              "Router Setup",
              "Wi-Fi Troubleshooting",
              "Network Security",
              "Speed Optimization",
            ]
          : [
              "Gushyiraho router",
              "Gukemura ibiba bya Wi-Fi",
              "Umutekano w'interineti",
              "kongera imikorere",
            ],
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573505/pexels-kseniachernaya-7295879_rrqnqf.jpg",
      icon: FaGraduationCap,
      title:
        lang === "en"
          ? "Digital Literacy & Training"
          : "Guhugura mu ikoranabuhanga",
      description:
        lang === "en"
          ? "Personalized training on digital tools, e-government services, and essential digital skills for daily life."
          : "Amahugurwa ku giti cyawe ku bikoresho by'ikoranabuhanga, serivise za leta z'ikoranabuhanga, n'ubumenyi bukenewe mu buzima bwa buri munsi.",
      features:
        lang === "en"
          ? [
              "Email & Communication",
              "E-Government Services",
              "Online Banking",
              "Digital Safety",
            ]
          : [
              "Imeli n'itumanaho",
              "Serivise za leta",
              "Amabanki yikoranabuhanga",
              "Umutekano mu ikoranabuhanga",
            ],
      color: "from-orange-500 to-orange-600",
    },
  ];

  const digitalAccessServices = [
    {
      id: 1,
      icon: FaLaptop,
      title:
        lang === "en"
          ? "Device Access Programs"
          : "Gahunda zo kubona z'ibikoresho",
      description:
        lang === "en"
          ? "Partnering with institutions to provide computers, tablets, and smartphones at discounted rates or free to underserved communities."
          : "Gufatanya n'inzego zitandukanye mu gutanga mudasobwa, tableti, na terefone zigendanwa ku giciro cyo hasi cyangwa ubuntu ku kubatabifite.",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 2,
      icon: FaWifi,
      title:
        lang === "en"
          ? "Internet Connectivity Support"
          : "Gufasha kubona interineti",
      description:
        lang === "en"
          ? "Facilitating affordable internet access through partnerships with ISPs and community centers across Rwanda."
          : "Koroshya kubona interineti binyuze mu bufatanyabikorwa n'abatanga interineti n'ibigo by'abaturage hirya no hino mu Rwanda.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: 3,
      icon: FaHandHoldingHeart,
      title: lang === "en" ? "Community Outreach" : "Kwegera abaturage",
      description:
        lang === "en"
          ? "Direct community engagement to identify and address digital access needs in partnership with local governement."
          : "Kwegera abaturage kugira ngo habashwe gusuzuma no gukemura ibibazo byo kubona ikoranabuhanga hamwe n'ubuyobozi bw'aho baba.",
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
      id="services"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-secondary/20 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-secondary/20 rounded-full animate-float"></div>
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-secondary/20 bg-secondary rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* How Fixo Works with Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === "en" ? "How Fixo Works" : "Fixo Ikora Ite"}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {lang === "en"
                ? "Our comprehensive partnership model ensures 24/7 technical support and digital access for everyone"
                : "Uburyo bwacu bwuzuye bwo gufatanya bureba ko hari ubufasha bwa tekinike 24/7 n'ikoranabuhanga ku bantu bose"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {partnershipModel.map((model, index) => (
              <div
                key={model.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="p-8 text-center">
                  <div
                    className={`w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <model.icon className="text-secondary text-2xl" />
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-400">
                      0{index + 1}
                    </span>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {model.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 1: Digital Skills & Assistance */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaTools className="text-lg" />
              <span>{lang === "en" ? "Part 1" : "Igice cya mbere"}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === "en"
                ? "Digital Skills & Real-Time Assistance"
                : "ubumenyi n'ubufasha mu ikoranabuhanga"}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {lang === "en"
                ? "Get expert help from our certified technicians through our system real-time communication and remote assistance"
                : "Bona ubufasha bw'inzobere binyuze muri sisitemu yacu mu itumanaho ryihuse aho uri hose igihe cyose"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalSkillsServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="text-white text-xl" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {service.features
                      .slice(0, 2)
                      .map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3 text-xs text-gray-500"
                        >
                          <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center m-5 flex justify-center"><Link to="/direct-support">
            <button className="flex items-center bg-primary text-white hover:text-secondary font-semibold py-3 px-4 transition-all duration-300 text-sm">
              <FaPhone/> &nbsp; {lang === "en" ? "Get Help Now" : "Bona ubufasha ubu"}
            </button>
          </Link></p>
        </div>

        {/* Part 2: Digital Access */}
        <div className="bg-primary rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaHandHoldingHeart className="text-lg" />
              <span>{lang === "en" ? "Part 2" : "Igice cya kabiri"}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {lang === "en"
                ? "Digital Access & Community Support"
                : "Gufasha abaturage no kubona ibikoresho by'ikoranabuhanga"}
            </h2>
            <p className="text-lg text-white max-w-3xl mx-auto">
              {lang === "en"
                ? "Partnering with government and other institutions to provide devices and internet access at discount or for free"
                : "Gufatanya na leta n'inzego zitandukanye kugira ngo dutange ibikoresho na interineti ku giciro cyo hasi cyangwa ubuntu"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {digitalAccessServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center border border-gray-100"
              >
                <div
                  className={`w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <service.icon className="text-white text-2xl" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <h3 className="text-3xl text-secondary font-bold">You Are All Welcomed!</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixoServicesSection;
