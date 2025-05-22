import Header from '../components/clients/Header';
import LanguageSelector from '../components/clients/LanguageSelector';
import HeroSection from '../components/clients/HeroSection';
import ServicesSection from '../components/clients/ServicesSection';
import TestimonialsSection from '../components/clients/TestimonialsSections';
import Footer from '../components/clients/Footer';
import ContactsSection from '../components/clients/ContactsSection';
import SEO from '../components/SEO';

const HomePage = () => {
  const lang = localStorage.getItem('lang');

  return (
    <div>
      <SEO
        title="Fixo | Rwanda’s On-Demand Tech Support Platform"
        description="Fixo is Rwanda's trusted on-demand support platform. Get instant help for your phone, computer, or online government services through live video support and mobile payments."
        keywords="Fixo Rwanda, tech support Rwanda, phone repair Rwanda, PC repair Rwanda, government e-services help Rwanda, on-demand support Rwanda, mobile repair Rwanda"
        ogTitle="Fixo | Rwanda’s On-Demand Tech Support Platform"
        ogDescription="Fix your tech problems fast with expert live video support from Fixo. Serving all Rwandans — pay instantly via mobile money."
        ogImage="https://fixo.rw/og/home.jpg"
        ogUrl="https://fixo.rw"
        ogType="website"
        twitterCard="summary_large_image"
        twitterCreator="@inonotechgroup"
        canonicalUrl="https://fixo.rw"
      />
      <Header />
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <ContactsSection lang={lang} />
      <Footer lang={lang} />
      <LanguageSelector forceShowModal={true} />
    </div>
  );
};

export default HomePage;
