import Footer from "../components/clients/Footer";
import Header from "../components/clients/Header";
import ServicesSection from "../components/clients/ServicesSection";
const storeBg = "/store.jpg";
const Services = () => {
    const lang = localStorage.getItem('lang');
  return (
    <div>
      <Header />
      <div
        className="w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${storeBg})` }}
      >
        <div className="flex items-center justify-center h-full bg-black/50">
          <h1 className="text-[#1DCE5F] text-3xl font-bold">
            Explore Our Services
          </h1>
        </div>
      </div>
      <ServicesSection lang={lang}/>
      <Footer />
    </div>
  );
};

export default Services;
