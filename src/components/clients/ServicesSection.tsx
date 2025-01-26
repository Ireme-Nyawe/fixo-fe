import React from 'react';

const ServicesSection = ({ lang }: any) => {
  const services = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title: lang === 'en' ? 'Fast Tech Help' : 'Ubufasha bwihuse',
      description:
        'We provide fast and reliable tech support to resolve your issues promptly.',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title: lang === 'en' ? 'Remote Support' : 'Ubufasha bwihuse kure',
      description:
        'Connect with our experts remotely for seamless tech assistance.',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title: lang === 'en' ? 'Expert Assistance' : 'Inzobere mu bufasha',
      description:
        'Our team of professionals offers top-notch assistance for all your tech needs.',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      title: lang === 'en' ? '24/7 Support' : 'Ubwunganizi umunsi wose',
      description:
        'We are available round the clock to ensure you get help whenever you need it.',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
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
