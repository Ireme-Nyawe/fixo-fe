import { FaDesktop, FaWifi, FaGraduationCap, FaTools } from 'react-icons/fa';

const ServicesSection = ({ lang }: { lang: string }) => {
  const services = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573498/photo_pqapzz.jpg',
      icon: FaDesktop,
      title: lang === 'en' ? 'Software Installation & Troubleshooting' : 'Gushyira software muri mudasobwa no gukemura ibibazo',
      description: lang === 'en' 
          ? 'Help computer users install, configure, and troubleshoot software (Windows, Office, antivirus, etc.) via remote sessions.'
        : "Dufasha abakoresha mudasobwa gushyiramo, gusuzuma, no gukemura ibibazo (Windows, Office, antivirus, nibindi) muburyo bw'iyakure.",
      features: lang === 'en' 
        ? ['Remote Installation', 'System Configuration', 'Software Updates', 'Performance Tuning']
        : ['Gushyira iyakure', 'Gusuzuma sisitemu', 'Gusubira software', 'Gutunganya imikorere'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573516/pexels-thirdman-5327914_ele525.jpg',
      icon: FaTools,
      title: lang === 'en' ? 'Device Diagnostics & Optimization' : 'Gusuzuma ibikoresho no kubitunganya',
      description: lang === 'en'
          ? 'Offer remote system health checks, performance tuning, and virus/malware removal for PCs, phones, and tablets.'
          : 'Dutanga ubufasha mu kugenzura imikorere, no gukuraho virusi / malware, kuri mudasobwa ,telefone, na tableti.',
      features: lang === 'en'
        ? ['Health Diagnostics', 'Virus Removal', 'Performance Boost', 'Data Recovery']
        : ['Gusuzuma ubuzima', 'Gukuraho virusi', 'Gutera imbere', 'Gusubira amakuru'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573509/pexels-brett-sayles-4508748_kwaqxi.jpg',
      icon: FaWifi,
      title: lang === 'en' ? 'Internet & Network Setup' : "Ubufasha kubijyanye na interineti",
      description: lang === 'en'
          ? 'Remote guidance in configuring routers, solving Wi-Fi issues, and improving connectivity — especially in home or small office setups.'
          : 'Gufasha no gushyiraho router, gukemura ibibazo bya Wi-Fi, no kunoza imiyoboro - cyane cyane murugo cyangwa ibiro bito hifashijwe iyakure.',
      features: lang === 'en'
        ? ['Router Setup', 'Wi-Fi Troubleshooting', 'Network Security', 'Speed Optimization']
        : ['Gushyiraho router', 'Gukemura Wi-Fi', 'Umutekano w\'umuyoboro', 'Gutera imbere'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573505/pexels-kseniachernaya-7295879_rrqnqf.jpg',
      icon: FaGraduationCap,
      title: lang === 'en' ? 'Digital Literacy & Tech Guidance' : "Guhugura mu ikoranabunga n'ubufasha muri tekinike",
      description: lang === 'en'
          ? 'Provide one-on-one guidance on using tools like email, Microsoft Teams, Zoom, online banking, and e-government platforms.'
          : "Dutanga ubufasha imbonankubone ku gukoresha ibikoresho ikoranabuhanga nka imeli, Microsoft Teams, Zoom, amabanki yo kuri interineti, hamwe na serivise za leta z'ikoranabunga.",
      features: lang === 'en'
        ? ['Email Setup', 'Video Conferencing', 'Online Banking', 'E-Government Services']
        : ['Gushyiraho imeli', 'Amahuriro y\'amaso', 'Amabanki yo kuri interineti', 'Serivise za leta'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden" id="services">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-secondary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-primary/15 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {lang === 'en' ? 'What We Do' : 'Ibyo Dukora'}
        </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {lang === 'en'
            ? 'Your one-stop destination for expert remote technical support. Connect with professionals to resolve tech issues quickly and efficiently.'
            : "Murakaza neza, Nitwe twenyine dufite inzobere mu gufasha mu bijyanye n'ikoranabuhanga. Tugufasha gukemura ibibazo byihuse kandi neza."}
        </p>
      </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
          >
              {/* Compact Image with Icon */}
              <div className="relative h-32 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Icon overlay */}
                <div className="absolute top-3 right-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="text-white text-lg" />
                  </div>
                </div>
              </div>

              {/* Compact Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors duration-300">
                {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Compact Features list */}
                <div className="space-y-1 mb-3">
                  {service.features.slice(0, 2).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1 h-1 bg-secondary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Compact Learn more button */}
                <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-secondary hover:to-secondaryDark text-gray-700 hover:text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 text-sm">
                  {lang === 'en' ? 'Learn More' : 'Menya byinshi'}
                </button>
              </div>
            </div>
          ))}
          </div>
      </div>
    </section>
  );
};

export default ServicesSection;
