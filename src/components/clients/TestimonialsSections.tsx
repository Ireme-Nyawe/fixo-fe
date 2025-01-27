import { FaStar } from 'react-icons/fa';
import Avatar from '/avatar.svg';

const TestimonialsSection = ({ lang }: any) => {
  const testimonials = [
    {
      id: 1,
      image: Avatar,
      name:
        lang === 'en' ? 'Jean Claude Nshimiyimana' : 'Jean Claude Nshimiyimana',
      location: lang === 'en' ? 'Kigali, Rwanda' : 'Kigali, Rwanda',
      feedback:
        lang === 'en'
          ? 'The service was outstanding! I would recommend it to anyone looking for professionalism and excellence.'
          : 'Serivisi za hano ni nziza cyane! Ndagira inama buri wese kubegera kubera ubunyamwuga n’ubuhanga bagira.',
      rating: 5,
    },
    {
      id: 2,
      image: Avatar,
      name: lang === 'en' ? 'Aline Uwase' : 'Aline Uwase',
      location: lang === 'en' ? 'Musanze, Rwanda' : 'Musanze, Rwanda',
      feedback:
        lang === 'en'
          ? 'Very responsive and reliable services. I appreciate their dedication to customer satisfaction.'
          : 'Serivisi nziza, by’umwihariko batanga ibisubizo ku gihe. Nishimira uburyo bafata abakiriya neza.',
      rating: 4,
    },
    {
      id: 3,
      image: Avatar,
      name: lang === 'en' ? 'Eric Habimana' : 'Eric Habimana',
      location: lang === 'en' ? 'Huye, Rwanda' : 'Huye, Rwanda',
      feedback:
        lang === 'en'
          ? 'Great experience! The team was very helpful, and their services exceeded my expectations.'
          : 'Ubunararibonye bwiza! Ikipe yabahanga cyane, kandi serivisi zabo zarandutunguye rwose.',
      rating: 4.5,
    },
  ];

  const renderStars = (rating: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-lg ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-left mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {lang === 'en' ? 'Clients Testimonials' : "Ubuhamya bw'abakiriya"}
        </h1>
        <p className="text-gray-600 max-w-xl leading-relaxed">
          {lang === 'en'
            ? "Day to day we serve different customers, that's why we love to share what they say about our company."
            : "Umunsi k'umunsi tugenda dufasha abakiriya batandukanye, nabo bakabyemeza badusigira ibitekerezo."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>

            <p className="text-gray-600 mb-4">{testimonial.feedback}</p>

            <div className="flex justify-center gap-1">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
