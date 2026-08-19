import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaStar, FaCheck, FaArrowRight } from 'react-icons/fa';

const HeroSection = ({ lang }: { lang: string }) => {
  const features = [
    { en: 'Instant response', rw: 'Tukwakira byihuse' },
    { en: 'Secure & reliable', rw: 'Umutekano usesuye' },
    { en: 'Expert technicians', rw: 'Abatekinisiye bashoboye' },
  ];

  const stats = [
    { value: '500+', en: 'Customers helped', rw: 'Abakiriya bafashijwe' },
    { value: '99%', en: 'Success rate', rw: 'Baranyuzwe' },
    { value: '24/7', en: 'Availability', rw: 'Turaboneka' },
  ];

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              {lang === 'en' ? '24/7 expert support' : 'Ubufasha bwizewe 24/7'}
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-slate-900 leading-[1.15]">
              {lang === 'en' ? (
                <>
                  Fast tech support,
                  <br />
                  <span className="text-primary">anywhere, anytime</span>
                </>
              ) : (
                <>
                  Ubufasha bwihuse,
                  <br />
                  <span className="text-primary">aho uri hose, igihe cyose</span>
                </>
              )}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
              {lang === 'en'
                ? 'Instant help from certified technicians, over live video. Pay with mobile money when your issue is solved.'
                : 'Habwa ubufasha bwihuse n’abatekinisiye bemewe kuri videwo. Wishyura ukoresheje telefone igihe ikibazo cyawe gikemutse.'}
            </p>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {features.map((feature) => (
                <li
                  key={feature.en}
                  className="flex items-center gap-1.5 text-xs text-slate-600"
                >
                  <FaCheck className="w-2.5 h-2.5 text-primary" />
                  {lang === 'en' ? feature.en : feature.rw}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/direct-support"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <FaPhoneAlt className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Call now' : 'Saba ubufasha'}
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {lang === 'en' ? 'Explore services' : 'Reba serivisi'}
                <FaArrowRight className="w-3 h-3" />
              </Link>

              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="flex text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="w-3 h-3" />
                  ))}
                </span>
                4.9/5
              </span>
            </div>

            <dl className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 max-w-sm">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <dt className="text-lg font-semibold text-slate-900">
                    {stat.value}
                  </dt>
                  <dd className="text-xs text-slate-500 leading-snug">
                    {lang === 'en' ? stat.en : stat.rw}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 h-60 sm:h-72 lg:h-[24rem]">
              <img
                src="/hero-bg.png"
                alt={
                  lang === 'en'
                    ? 'Getting tech support online'
                    : 'Kubona ubufasha bwa tekinoloji kuri interineti'
                }
                className="h-full w-auto object-contain mix-blend-multiply saturate-[.25] opacity-90"
              />
            </div>

            <div className="absolute -bottom-4 left-4 right-4 sm:left-6 sm:right-auto rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-500">
                {lang === 'en' ? 'Average wait time' : 'Igihe cyo gutegereza'}
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {lang === 'en'
                  ? 'Under 2 minutes'
                  : 'Munsi y’iminota 2'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
