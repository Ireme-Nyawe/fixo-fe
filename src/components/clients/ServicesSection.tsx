const ServicesSection = ({ lang }: any) => {
  const services = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573498/photo_pqapzz.jpg',
      title:
        lang === 'en'
          ? 'Software Installation & Troubleshooting'
          : 'Gushyira software muri mudasobwa no gukemura ibibazo',
      description:
        lang === 'en'
          ? 'Help computer users install, configure, and troubleshoot software (Windows, Office, antivirus, etc.) via remote sessions.'
          : "Dufasha abakoresha mudasobwa  gushyiramo, gusuzuma, no gukemura ibibazo (Windows, Office, antivirus, nibindi) muburyo bw'iyakure.",
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573516/pexels-thirdman-5327914_ele525.jpg',
      title:
        lang === 'en' ? 'Device Diagnostics & Optimization' : 'Gusuzuma ibikoresho no kubitunganya',
      description:
        lang === 'en'
          ? 'Offer remote system health checks, performance tuning, and virus/malware removal for PCs, phones, and tablets.'
          : 'Dutanga ubufasha mu kugenzura imikorere, no gukuraho virusi / malware, kuri mudasobwa ,telefone, na tableti.',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573509/pexels-brett-sayles-4508748_kwaqxi.jpg',
      title:
        lang === 'en'
          ? 'Internet & Network Setup'
          : "Ubufasha kubijyanye na interineti",
      description:
        lang === 'en'
          ? 'Remote guidance in configuring routers, solving Wi-Fi issues, and improving connectivity — especially in home or small office setups.'
          : 'Gufasha no gushyiraho router, gukemura ibibazo bya Wi-Fi, no kunoza imiyoboro - cyane cyane murugo cyangwa ibiro bito hifashijwe iyakure.',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dg05ngjr4/image/upload/v1747573505/pexels-kseniachernaya-7295879_rrqnqf.jpg',
      title:
        lang === 'en'
          ? 'Digital Literacy & Tech Guidance'
          : "Guhugura mu ikoranabunga n'ubufasha muri tekinike",
      description:
        lang === 'en'
          ? 'Provide one-on-one guidance on using tools like email, Microsoft Teams, Zoom, online banking, and e-government platforms.'
          : "Dutanga ubufasha imbonankubone ku gukoresha ibikoresho ikoranabuhanga nka imeli, Microsoft Teams, Zoom, amabanki yo kuri interineti, hamwe na serivise za leta z'ikoranabunga.",
    },
   
  ];

  return (
    <section className="container mx-auto px-4 py-12" id="services">
      <div className="text-left mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {lang === 'en' ? 'What We Do' : 'Ibyo Dukora'}
        </h1>
        <p className="text-gray-600 max-w-xl leading-relaxed">
          {lang === 'en'
            ? 'Your one-stop destination for expert remote technical support. Connect with professionals to resolve tech issues quickly and efficiently.'
            : "Murakaza neza, Nitwe twenyine dufite inzobere mu gufasha mu bijyanye n'ikoranabuhanga. Tugufasha gukemura ibibazo byihuse kandi neza."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative group bg-white border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-secondary">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
