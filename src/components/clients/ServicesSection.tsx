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
    <section className="bg-slate-50 border-t border-slate-100" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-12">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {lang === "en" ? "How it works" : "Uko bikorwa"}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {lang === "en" ? "How Fixo works" : "Fixo ikora ite"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {lang === "en"
                ? "Our partnership model keeps technical support and digital access available to everyone, around the clock."
                : "Uburyo bwacu bwo gufatanya butuma ubufasha bwa tekinike n'ikoranabuhanga biboneka ku bantu bose igihe cyose."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {partnershipModel.map((model, index) => (
              <div
                key={model.id}
                className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    <model.icon className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {model.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
                {lang === "en" ? "Part 1" : "Igice cya mbere"}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                {lang === "en"
                  ? "Digital skills & real-time assistance"
                  : "Ubumenyi bw'ikoranabuhanga n'ubufasha bwihuse"}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {lang === "en"
                  ? "Get expert help from our certified technicians through real-time communication and remote assistance."
                  : "Habwa ubufasha bw'abatekinisiye bacu bemewe mu kanya, ukoresheje iyakure."}
              </p>
            </div>

            <Link
              to="/direct-support"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors self-start"
            >
              <FaPhone className="w-3 h-3" />
              {lang === "en" ? "Get help now" : "Bona ubufasha ubu"}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {digitalSkillsServices.map((service) => (
              <article
                key={service.id}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors"
              >
                <div className="h-36 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <service.icon className="w-4 h-4 text-primary mb-2.5" />
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 leading-snug">
                    {service.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <ul className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="text-xs text-slate-500">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {lang === "en" ? "Part 2" : "Igice cya kabiri"}
            </p>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
              {lang === "en"
                ? "Digital access & community support"
                : "Gufasha abaturage no kubona ibikoresho"}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {lang === "en"
                ? "Partnering with government and other institutions to provide devices and internet access at a discount or for free."
                : "Gufatanya na leta n'inzego zitandukanye kugira ngo dutange ibikoresho na interineti ku giciro cyo hasi cyangwa ubuntu."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {digitalAccessServices.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <service.icon className="w-4 h-4 text-primary mb-3" />
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            {lang === "en" ? "You are all welcomed!" : "Mwese muraje!"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FixoServicesSection;
