import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Avatar from '/avatar.svg';

const TestimonialsSection = ({ lang }: { lang: string }) => {
  const anonymous = lang === 'en' ? 'Prefer not to say' : 'Yagizwe ibanga';

  const testimonials = [
    {
      id: 1,
      location: 'Kigali, Rwanda',
      rating: 5,
      service: lang === 'en' ? 'Software Installation' : 'Gushyira Software muri mudasobwa',
      feedback:
        lang === 'en'
          ? 'The service was outstanding! I would recommend it to anyone looking for professionalism and excellence. The technician was knowledgeable and solved my computer issues quickly.'
          : "Serivisi za hano ni nziza cyane! Ndagira inama buri wese kubegera kubera ubunyamwuga n'ubuhanga bagira. Umutekinisiye wanfashije yari afite ubumenyi kandi yakemuye ibibazo bya mudasobwa yanjye byihuse.",
    },
    {
      id: 2,
      location: 'Musanze, Rwanda',
      rating: 4,
      service: lang === 'en' ? 'Network Setup' : 'Gushyiraho Umuyoboro wa interineti',
      feedback:
        lang === 'en'
          ? 'Very responsive and reliable services. I appreciate their dedication to customer satisfaction. They helped me set up my home network perfectly.'
          : "Serivisi nziza, by'umwihariko batanga ibisubizo ku gihe. Nishimira uburyo bafata abakiriya neza. Banfashije gushyiraho umuyoboro wa interineti murugo.",
    },
    {
      id: 3,
      location: 'Huye, Rwanda',
      rating: 4.5,
      service: lang === 'en' ? 'Digital Literacy' : "Ubumenyi bw'Ikoranabuhanga",
      feedback:
        lang === 'en'
          ? 'Great experience! The team was very helpful, and their services exceeded my expectations. They taught me how to use digital tools effectively.'
          : "Ubunararibonye bwiza! Ikipe yabahanga cyane, kandi serivisi zabo zarandutunguye rwose. Banigishije uburyo bwo gukoresha ibikoresho by'ikoranabuhanga neza.",
    },
    {
      id: 4,
      location: 'Rubavu, Rwanda',
      rating: 5,
      service: lang === 'en' ? 'Data Recovery' : 'Kugarura amakuru yari yabuze',
      feedback:
        lang === 'en'
          ? 'Excellent customer service! They helped me recover my lost data and optimize my computer performance. Highly recommended!'
          : "Bampaye serivisi nziza cyane! Banfashije kugarura amakuru yanjye yari yabuze n'imikorere ya mudasobwa yanjye. Ndababarangiye cyane!",
    },
    {
      id: 5,
      location: 'Nyagatare, Rwanda',
      rating: 4,
      service: lang === 'en' ? 'Internet Support' : 'Ubufasha bwa interineti',
      feedback:
        lang === 'en'
          ? 'Professional and efficient service. They resolved my internet connectivity issues in no time. The support team is amazing!'
          : "Bampaye serivisi kinyamwuga kandi neza. Bakemuye ibibazo by'imiyoboro yanjye mu gihe gito. Aba tekinisiye bakora neza cyane!",
    },
    {
      id: 6,
      location: 'Karongi, Rwanda',
      rating: 5,
      service: lang === 'en' ? 'Digital Training' : 'Kwiga Ikoranabuhanga',
      feedback:
        lang === 'en'
          ? 'Outstanding support! They helped me learn online banking and e-government services. Very patient and understanding teachers.'
          : "Ubufasha bw'ikoranabuhanga! Banfashije kwiga uburyo banki kuri interineti na servisi za leta. Abigisha bafite ubunararibonye kandi bakora neza.",
    },
  ];

  const averageRating = (
    testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <section className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'en' ? 'Customer stories' : "Inkuru z'abakiriya"}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {lang === 'en' ? 'What our clients say' : 'Ibyo abakiriya bacu bavuga'}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              {lang === 'en'
                ? 'We serve different customers every day, and they tell us how it went.'
                : "Umunsi k'umunsi dufasha abakiriya batandukanye, nabo bakadusigira ibitekerezo."}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <span className="text-2xl font-semibold text-slate-900">{averageRating}</span>
            <span className="text-xs text-slate-500 leading-snug">
              <span className="flex text-amber-400 mb-0.5">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="w-3 h-3" />
                ))}
              </span>
              {lang === 'en'
                ? `${testimonials.length} reviews`
                : `Ibitekerezo ${testimonials.length}`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-3 h-3 ${
                        index < Math.round(testimonial.rating)
                          ? 'text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </span>
                <FaQuoteLeft className="w-3.5 h-3.5 text-slate-200" />
              </div>

              <blockquote className="flex-1 text-sm text-slate-600 leading-relaxed">
                {testimonial.feedback}
              </blockquote>

              <figcaption className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={Avatar}
                  alt=""
                  className="w-8 h-8 rounded-full bg-slate-100"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {anonymous}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {testimonial.location} · {testimonial.service}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
