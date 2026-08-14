import { FaStar, FaQuoteLeft, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import Avatar from '/avatar.svg';

const TestimonialsSection = ({ lang }: { lang: string }) => {
  const testimonials = [
    {
      id: 1,
      image: Avatar,
      name: lang === 'en' ? 'Prefer not to say' : 'yagizwe ibanga',
      location: lang === 'en' ? 'Kigali, Rwanda' : 'Kigali, Rwanda',
      feedback: lang === 'en'
        ? 'The service was outstanding! I would recommend it to anyone looking for professionalism and excellence. The technician was knowledgeable and solved my computer issues quickly.'
        : 'Serivisi za hano ni nziza cyane! Ndagira inama buri wese kubegera kubera ubunyamwuga n\'ubuhanga bagira. umutekinisiye wanfashije yari afite ubumenyi kandi yakemuye ibibazo bya mudasobwa yanjye byihuse.',
      rating: 5,
      service: lang === 'en' ? 'Software Installation' : 'Gushyira Software muri mudasobwa',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      image: Avatar,
      name: lang === 'en' ? 'Prefer not to say' : 'yagizwe ibanga',
      location: lang === 'en' ? 'Musanze, Rwanda' : 'Musanze, Rwanda',
      feedback: lang === 'en'
        ? 'Very responsive and reliable services. I appreciate their dedication to customer satisfaction. They helped me set up my home network perfectly.'
        : 'Serivisi nziza, by\'umwihariko batanga ibisubizo ku gihe. Nishimira uburyo bafata abakiriya neza. Banfashije gushyiraho umuyoboro wa interineti murugo.',
      rating: 4,
      service: lang === 'en' ? 'Network Setup' : 'Gushyiraho Umuyoboro wa interinet',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      image: Avatar,
      name: lang === 'en' ? 'Prefer not to say' : 'yagizwe ibanga',
      location: lang === 'en' ? 'Huye, Rwanda' : 'Huye, Rwanda',
      feedback: lang === 'en'
        ? 'Great experience! The team was very helpful, and their services exceeded my expectations. They taught me how to use digital tools effectively.'
        : 'Ubunararibonye bwiza! Ikipe yabahanga cyane, kandi serivisi zabo zarandutunguye rwose. Banigishije uburyo bwo gukoresha ibikoresho by\'ikoranabuhanga neza.',
      rating: 4.5,
      service: lang === 'en' ? 'Digital Literacy' : 'Ubumenyi bw\'Ikoranabuhanga',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      image: Avatar,
      name: lang === 'en' ? 'Prefer not to say' : 'yagizwe ibanga',
      location: lang === 'en' ? 'Rubavu, Rwanda' : 'Rubavu, Rwanda',
      feedback: lang === 'en'
        ? 'Excellent customer service! They helped me recover my lost data and optimize my computer performance. Highly recommended!'
        : 'Bampaye serivisi nziza cyane! Banfashije kugarura amakuru yanjye yari yabuze n\' imikorere ya mudasobwa yanjye. Ndababarangiye cyane!',
      rating: 5,
      service: lang === 'en' ? 'Data Recovery' : 'kugarura amakuru yari yabuze',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 5,
      image: Avatar,
      name: lang === 'en' ? 'Prefer not to say' : 'yagizwe ibanga',
      location: lang === 'en' ? 'Nyagatare, Rwanda' : 'Nyagatare, Rwanda',
      feedback: lang === 'en'
        ? 'Professional and efficient service. They resolved my internet connectivity issues in no time. The support team is amazing!'
        : 'Bampaye serivisi kinyamwuga kandi neza. Bakemuye ibibazo by\'imiyoboro yanjye mu gihe gito. Aba tekinisiye bakora neza cyane!',
      rating: 4,
      service: lang === 'en' ? 'Internet Support' : 'Ubufasha bwa interineti',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 6,
      image: Avatar,
      name: lang === 'en' ? 'Prefer not to say' : 'yagizwe ibanga',
      location: lang === 'en' ? 'Karongi, Rwanda' : 'Karongi, Rwanda',
      feedback: lang === 'en'
        ? 'Outstanding support! They helped me learn online banking and e-government services. Very patient and understanding teachers.'
        : 'Ubufasha bw\'ikoranabuhanga! Banfashije kwiga uburyo banki kuri interineti na servisi za leta. Abigisha bafite ubunararibonye kandi bakora neza.',
      rating: 5,
      service: lang === 'en' ? 'Digital Training' : 'Kwiga Ikoranabuhanga',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-24 h-24 bg-secondary/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 mb-6">
            <FaHeart className="text-secondary text-lg" />
            <span className="text-secondary font-semibold">
              {lang === 'en' ? 'Customer Stories' : 'Inkuru z\'Abakiriya'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {lang === 'en' ? 'What Our Clients Say' : 'Ibyo Abakiriya Bacu Bavuga'}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {lang === 'en'
              ? "Day to day we serve different customers, that's why we love to share what they say about our company and services."
              : "Umunsi k'umunsi tugenda dufasha abakiriya batandukanye, nabo bakabyemeza badusigira ibitekerezo ku bijyanye na fixo na serivisi dutanga."}
          </p>
        </div>


        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-4 z-10">
                <div className={`w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg`}>
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
              </div>

              {/* Service Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                  {testimonial.service}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-16">
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Feedback */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center italic">
                  "{testimonial.feedback}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <FaMapMarkerAlt className="text-xs" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-secondary/20 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
