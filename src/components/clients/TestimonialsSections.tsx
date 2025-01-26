import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import the star icon from react-icons

const TestimonialsSection = ({ lang }: any) => {
  const testimonials = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      name: lang === 'en' ? "Client's Name 1" : "Umuzwiririwa Wa 'Client' 1",
      feedback:
        lang === 'en'
          ? 'What they say about our services.'
          : 'Icyo abivugaho kuri serivisi zacu.',
      rating: 4.5,
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      name: lang === 'en' ? "Client's Name 2" : "Umuzwiririwa Wa 'Client' 2",
      feedback:
        lang === 'en'
          ? 'What they say about our services.'
          : 'Icyo abivugaho kuri serivisi zacu.',
      rating: 3,
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dpu6ljn5c/image/upload/v1737899203/pexels-pavel-danilyuk-7658385_1_tpzzsv.png',
      name: lang === 'en' ? "Client's Name 3" : "Umuzwiririwa Wa 'Client' 3",
      feedback:
        lang === 'en'
          ? 'What they say about our services.'
          : 'Icyo abivugaho kuri serivisi zacu.',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
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
          {' '}
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

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {testimonial.name}
            </h3>

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
