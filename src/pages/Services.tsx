import AboutSection from '../components/clients/AboutSection';
import Footer from '../components/clients/Footer';
import Header from '../components/clients/Header';
import ServicesSection from '../components/clients/ServicesSection';
import TestimonialsSection from '../components/clients/TestimonialsSections';
import SEO from '../components/SEO';

const Services = () => {
  const lang = localStorage.getItem('lang') || 'en';

  return (
    <div className="bg-white">
      <SEO
        title="Fixo Services | On-Demand Tech Support in Rwanda"
        description="Get instant video support from Fixo's experts for phone repair, PC troubleshooting, and accessing Rwanda’s e-Government services. Convenient. Reliable. Rwandan."
        keywords="tech support Rwanda, fixo services, Digital devices repair Rwanda, PC support Rwanda, e-government help, online tech support"
        ogTitle="Explore Who We are"
        ogDescription="Any technology issue? we bridge digital divide from any corner. we partener with government, private sector and work onself"
        ogImage="https://fixo.rw/og/services.jpg"
        ogUrl="https://fixo.rw/services"
        ogType="service"
        twitterCard="summary_large_image"
        twitterCreator="@inonotechgroup"
        canonicalUrl="https://fixo.rw/services"
      />
      <Header />
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
            {lang === 'en' ? 'Who we are' : 'Abo turi bo'}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {lang === 'en'
              ? 'About Fixo and what we do'
              : 'Ibyerekeye Fixo n’ibyo dukora'}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
            {lang === 'en'
              ? 'Our mission, our services, and the people we work with across Rwanda.'
              : 'Intego yacu, serivisi zacu, n’abo dukorana mu Rwanda hose.'}
          </p>
        </div>
      </section>
      <AboutSection lang={lang} />
      <ServicesSection lang={lang} />
      <TestimonialsSection lang={lang} />

      <Footer lang={lang}/>
    </div>
  );
};

export default Services;
