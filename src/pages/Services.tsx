import Footer from '../components/clients/Footer';
import Header from '../components/clients/Header';
import ServicesSection from '../components/clients/ServicesSection';
import SEO from '../components/SEO'; // Ensure path is correct

const storeBg = '/store.jpg';

const Services = () => {
  const lang = localStorage.getItem('lang');

  return (
    <div>
      <SEO
        title="Fixo Services | On-Demand Tech Support in Rwanda"
        description="Get instant video support from Fixo's experts for phone repair, PC troubleshooting, and accessing Rwanda’s e-Government services. Convenient. Reliable. Rwandan."
        keywords="tech support Rwanda, fixo services, phone repair Rwanda, PC support Rwanda, e-government help, online tech support"
        ogTitle="Explore Fixo Services"
        ogDescription="Need help fixing your phone or PC? Fixo connects you with expert technicians via live video. We also assist with government platforms like Irembo and Umucyo."
        ogImage="https://fixo.rw/og/services.jpg"
        ogUrl="https://fixo.rw/services"
        ogType="service"
        twitterCard="summary_large_image"
        twitterCreator="@inonotechgroup"
        canonicalUrl="https://fixo.rw/services"
      />
      <Header />
      <div
        className="w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${storeBg})` }}
      >
        <div className="flex items-center justify-center h-full bg-black/50">
          <h1 className="text-[#1DCE5F] text-3xl font-bold">
            {lang === 'en' ? 'Explore Our Services' : 'Reba Serivisi Dutanga'}
          </h1>
        </div>
      </div>
      <ServicesSection lang={lang} />
      <Footer />
    </div>
  );
};

export default Services;
