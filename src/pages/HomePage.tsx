import Header from '../components/clients/Header';
import LanguageSelector from '../components/clients/LanguageSelector';
import HeroSection from '../components/clients/HeroSection';
import ServicesSection from '../components/clients/ServicesSection';
import TestimonialsSection from '../components/clients/TestimonialsSections';
import Footer from '../components/clients/Footer';
import ContactsSection from '../components/clients/ContactsSection';

const HomePage = () => {
  const lang = localStorage.getItem('lang');

  return (
    <div>
      <Header />
      <HeroSection lang={lang} />
      <ServicesSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <ContactsSection lang={lang}/>
      <Footer lang={lang} />
      <LanguageSelector forceShowModal={true} />
    </div>
  );
};

export default HomePage;
