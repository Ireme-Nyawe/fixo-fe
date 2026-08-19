import ContactsSection from '../components/clients/ContactsSection';
import Footer from '../components/clients/Footer';
import Header from '../components/clients/Header';
import SEO from '../components/SEO';

const Contact = () => {
  const lang = localStorage.getItem('lang') || 'en';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Contact Fixo"
        description="Reach the Fixo team by phone, email or the contact form. We respond within 24 hours."
      />
      <Header />

      <main className="flex-1">
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'en' ? 'Talk to us' : 'Tuvugishe'}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {lang === 'en' ? 'Find our contacts' : 'Reba aho wadusanga'}
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              {lang === 'en'
                ? 'Call, email, or send us a message — we respond within 24 hours.'
                : 'Duhamagare, twandikire imeyili cyangwa ubutumwa — dusubiza mu masaha 24.'}
            </p>
          </div>
        </section>

        <ContactsSection lang={lang} showHeader={false} />
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default Contact;
