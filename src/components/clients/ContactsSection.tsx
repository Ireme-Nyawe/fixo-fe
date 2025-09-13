import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaQuestionCircle, FaPaperPlane, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ContactsSection = ({ lang }: { lang: string }) => {
  type LangContent = {
    question: string;
    answer: string;
  };

  type FAQ = {
    en: LangContent;
    rw: LangContent;
  };

  type ContactContent = {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formButton: string;
    faqTitle: string;
    findUsTitle: string;
    contactInfo: string;
    getInTouch: string;
    quickResponse: string;
  };

  const [isThankYou, setThankyou] = useState<boolean>(false);

  const faqs: FAQ[] = [
    {
      en: {
        question: 'What kind of issues can I get help with on Fixo?',
        answer:
          "Fixo helps you solve a wide range of tech-related problems. Whether your phone, computer, or system isn't working, or you need help with government services or online platforms — our technicians are ready to assist you via video call.",
      },
      rw: {
        question: 'Ni ibihe bibazo nshobora gufashwamo kuri Fixo?',
        answer:
          "Fixo igufasha gukemura ibibazo bitandukanye bijyanye n'ikoranabuhanga. Niba telefone yawe, mudasobwa cyangwa sisitemu bitagikora, cyangwa ukeneye ubufasha mu gukoresha serivisi za leta cyangwa imbuga za interineti — abatekinisiye bacu baba biteguye kugufasha biciye kuri videwo.",
      },
    },
    {
      en: {
        question: 'How does the Fixo support process work?',
        answer:
          "Just click the 'Call now' button and you’ll be connected to a technician via video. You explain your issue, they guide you through solutions, and at the end, they send a payment request directly to your phone.",
      },
      rw: {
        question: 'Uburyo bwo gufashwa kuri Fixo bukora gute?',
        answer:
          "Uhitamo 'Saba Ubufasha', uhuzwa n'umutekinisiye biciye kuri videwo. Ubusobanurira ikibazo cyawe, aguhereza ibisubizo, hanyuma akohereza ubusabe bwo kwishyura kuri telefone yawe.",
      },
    },
    {
      en: {
        question: 'Is the support available 24/7?',
        answer:
          'Support availability depends on technician availability. Most of our support is offered from 6:00 AM to 10:00 PM, but we’re working to extend hours soon.',
      },
      rw: {
        question: 'Ese ubufasha buboneka amasaha yose?',
        answer:
          'Ubufasha bushingira ku kuboneka kw’abatekinisiye. Akenshi tuboneka kuva saa mbiri za mu gitondo (6:00 AM) kugeza saa yine z’ijoro (10:00 PM), ariko turateganya kongera amasaha vuba.',
      },
    },
    {
      en: {
        question: 'How do I pay after getting help?',
        answer:
          'After your video session, the technician will request a payment by entering your phone number and amount. A payment popup will appear on your phone so you can confirm and complete it easily.',
      },
      rw: {
        question: 'Nigute nishyura nyuma yo gufashwa?',
        answer:
          'Nyuma yo kurangiza kuvugana n’umutekinisiye, akwandikira ubusabe bwo kwishyura akoresheje numero ya telefone yawe n’amafaranga. Urahita ubona ubutumwa bugufasha kwishyura byoroshye kuri telefone yawe.',
      },
    },
    {
      en: {
        question: 'Is my information safe when using Fixo?',
        answer:
          'Yes. All video sessions and payment processes are secure and private. We do not store your payment details or share your data with anyone.',
      },
      rw: {
        question: 'Ese amakuru yanjye aba afite umutekano ukoresheje Fixo?',
        answer:
          "Yego. Ibiganiro bya videwo n'uburyo bwo kwishyura birinzwe kandi bigirwa ibanga. Ntitubika amakuru y'ubwishyu cyangwa ngo tuyasangize undi muntu uwo ari we wese.",
      },
    },
  ];

  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter((item) => item !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };

  const contactInfo: Record<string, ContactContent> = {
    en: {
      title: 'Contact Us',
      subtitle: "We're here to help with your technology needs",
      address: 'Makuza Peace Plaza, Kigali, Rwanda',
      phone: '(250) 785 450 726',
      email: 'support@fixo.rw',
      hours: 'Mon - Fri: 6:00 AM - 10:00 PM',
      formName: 'Name',
      formEmail: 'Email',
      formSubject: 'Subject',
      formMessage: 'Message',
      formButton: 'Send Message',
      faqTitle: 'Frequently Asked Questions',
      findUsTitle: 'Find Us On Map',
      contactInfo: 'Contact Information',
      getInTouch: 'Get In Touch',
      quickResponse: 'We respond within 24 hours',
    },
    rw: {
      title: 'Twandikire',
      subtitle: 'Turi hano kugira ngo tusibe icyuho mu ikoranabunga',
      address: 'Makuza Peace Plaza, Kigali, Rwanda',
      phone: '(250) 785 450 726',
      email: 'support@fixo.rw',
      hours: '24/7 - igihe cyose',
      formName: 'Izina',
      formEmail: 'Imeyili',
      formSubject: 'Impamvu',
      formMessage: 'Ubutumwa',
      formButton: 'Ohereza Ubutumwa',
      faqTitle: 'Ibibazo Bibazwa Kenshi',
      findUsTitle: 'Dushake kuri Map',
      contactInfo: 'Aho wadusanga',
      getInTouch: 'Twandikire',
      quickResponse: 'dusubiza mu gihe gito',
    },
  };

  const currentLang = lang === 'rw' ? 'rw' : 'en';
  const content = contactInfo[currentLang];
  // handle send message
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setThankyou(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => {
      setThankyou(false);
    }, 3000);
  };
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-secondary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-primary/15 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 mb-6">
            <FaEnvelope className="text-secondary text-lg" />
            <span className="text-secondary font-semibold">
              {lang === 'en' ? 'Get In Touch' : 'Twandikire'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {content.title}
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{lang === 'en' ? 'Address' : 'Aho dukorera'}</h3>
                    <p className="text-gray-600 text-sm">{content.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{lang === 'en' ? 'Phone' : 'Telefone'}</h3>
                    <p className="text-gray-600 text-sm">{content.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{lang === 'en' ? 'Email' : 'Imeyili'}</h3>
                    <p className="text-gray-600 text-sm">{content.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{lang === 'en' ? 'Hours' : 'Amasaha'}</h3>
                    <p className="text-gray-600 text-sm">{content.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <FaPaperPlane className="text-white text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{content.getInTouch}</h2>
                  <p className="text-sm text-gray-600">{content.quickResponse}</p>
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      {content.formName}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
                      placeholder={lang === 'en' ? 'Your full name' : 'Izina ryawe ryuzuye'}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      {content.formEmail}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
                      placeholder={lang === 'en' ? 'your@email.com' : 'imeyili@yawe.com'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                    {content.formSubject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
                    placeholder={lang === 'en' ? 'What is this about?' : 'Ni iki?'}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                    {content.formMessage}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300 resize-none"
                    placeholder={lang === 'en' ? 'Tell us how we can help...' : 'Dusobanure uko dushobora gufasha...'}
                  ></textarea>
                </div>

                {isThankYou && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 text-lg" />
                    <p className="font-medium">
                      {lang === 'en' ? 'Thank you! We\'ll get back to you soon.' : 'Murakoze! Tuzagaruka vuba.'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-secondary text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-lg" />
                  {content.formButton}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - FAQ & Map */}
          <div className="space-y-4">
            {/* FAQ Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary flex items-center justify-center">
                  <FaQuestionCircle className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{content.faqTitle}</h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      className="flex justify-between items-center w-full p-4 text-left font-semibold hover:bg-gray-50 transition-colors duration-300"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-gray-900 pr-4">{faq[currentLang].question}</span>
                      <div className="flex-shrink-0">
                        {expandedFaqs.includes(index) ? (
                          <FaChevronUp className="text-secondary text-sm" />
                        ) : (
                          <FaChevronDown className="text-secondary text-sm" />
                        )}
                      </div>
                    </button>
                    {expandedFaqs.includes(index) && (
                      <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                        {faq[currentLang].answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{content.findUsTitle}</h2>
              </div>

              <div className="w-full h-64 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5145.349364251022!2d30.0595654!3d-1.9465655999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4240db7b3f5%3A0x5256fd511623ef15!2sMakuza%20Peace%20Plaza!5e1!3m2!1sen!2srw!4v1747666821548!5m2!1sen!2srw"
                  width="100%"
                  height="100%"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl border-0"
                  title="Fixo Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
