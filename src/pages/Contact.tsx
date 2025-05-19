import ContactsSection from "../components/clients/ContactsSection";
import Footer from "../components/clients/Footer";
import Header from "../components/clients/Header";
const storeBg = "/store.jpg";
const Contact = () => {
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
            {lang==="en"?'Contact Us':'Twandikire'}
          </h1>
        </div>
      </div>
      <ContactsSection lang={lang}/>
      <Footer />
    </div>
  );
};

export default Contact;
