const ServicesSection = ({ lang }: any) => {
  const services = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Government Services Assistance'
          : 'Ubufasha kuri Serivisi za Leta',
      description:
        lang === 'en'
          ? 'Assisting citizens with civil status declarations, e-passport applications, and other government services through Irembo. Providing support for RRA tax declarations and ensuring efficient access to government services.'
          : 'Gufasha abaturage gutangaza imiterere y’umuryango, gusaba pasiporo z’ikoranabuhanga, n’izindi serivisi za Leta binyuze kuri Irembo Gov. Gutanga ubufasha mu gutangaza imisoro ya RRA no kugera kuri serivisi za Leta neza.',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en' ? 'Technical Consultation' : 'Inama z’Ikoranabuhanga',
      description:
        lang === 'en'
          ? 'Providing expert advice on software, tools, and hardware tailored to your needs. Assisting with system upgrades and new setups for optimal performance.'
          : 'Gutanga inama z’abahanga kuri porogaramu, n’ibikoresho by’ikoranabuhanga bijyanye n’ibyo ukeneye. Kugufasha kuvugurura sisitemu no gushyiraho inshya kugirango zikore neza.',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Network and Connectivity Support'
          : "Ubufasha ku bijyanye n'impuzanzira ndetse na murandasi",
      description:
        lang === 'en'
          ? 'Setting up and troubleshooting Wi-Fi, network connections, and ensuring seamless internet access.'
          : 'Gushyiraho no gukemura ibibazo bya Wi-Fi, imiyoboro, no kubafasha kugira Murandasi yihuta kandi ihoraho',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Operating System Support'
          : 'Ubufasha ku Mikorere ya Sisitemu za mudasobwa',
      description:
        lang === 'en'
          ? 'Resolving issues with Windows, macOS, Linux, or other operating systems. Assisting with updates, upgrades, and system reinstalls.'
          : 'Gukemura ibibazo bya Windows, macOS, Linux, n’izindi gahunda za mudasobwa. Kugufasha kuvugurura no kongera gushyiraho sisitemu za mudasobwa nshya.',
    },
    {
      id: 5,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Data Backup and Recovery'
          : 'Kubika no Gusubirana Amakuru',
      description:
        lang === 'en'
          ? 'Setting up automatic backups to cloud or local storage. Recovering lost data due to accidental deletion or hardware failure.'
          : 'Gushyiraho uburyo bwo kubika amakuru mu buryo bwikora mu bubiko bw’ikirere cyangwa ubusanzwe. Gusubirana amakuru yabuze kubera gusiba by’impanuka cyangwa kwangirika kw’ibikoresho.',
    },
    {
      id: 6,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Email and Account Support'
          : 'Ubufasha kuri Imeyili na Konti',
      description:
        lang === 'en'
          ? 'Configuring email accounts on devices. Troubleshooting login or sync issues. Assisting with password recovery and account security.'
          : 'Gushyiraho konti z’imeyili ku bikoresho. Gukemura ibibazo byo kwinjira cyangwa guhuzanya amakuru. Kugufasha gusubirana ijambo ry’ibanga no kurinda konti.',
    },
    {
      id: 7,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Cloud Service Assistance'
          : 'Ubufasha ku Mikorere ya Sisitemu zo kuri Murandasi',
      description:
        lang === 'en'
          ? 'Setting up and managing cloud services like Google Workspace, Microsoft 365, etc. Resolving issues with file synchronization or access.'
          : 'Gushyiraho no gucunga serivisi za murandasi nka Google Workspace, Microsoft 365, n’izindi. Gukemura ibibazo byo guhuzanya cyangwa kugera ku mafayili.',
    },
    {
      id: 8,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title:
        lang === 'en'
          ? 'Software Troubleshooting and Installation'
          : 'Gukemura no Gushyiraho Porogaramu',
      description:
        lang === 'en'
          ? 'Installing and updating software applications. Resolving software errors or crashes. Configuring settings for optimal performance.'
          : 'Gushyiraho no kuvugurura porogaramu, gukemura amakosa ya porogaramu, no gutunganya uburyo bwo gukoresha neza.',
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
