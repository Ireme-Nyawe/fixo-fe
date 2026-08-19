import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ContactsSection = ({
  lang,
  showHeader = true,
}: {
  lang: string;
  showHeader?: boolean;
}) => {
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
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setThankyou(true);
    const form = e.target as HTMLFormElement;
    form.reset();
    setTimeout(() => {
      setThankyou(false);
    }, 3000);
  };
  const inputClass =
    'w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all';

  const details = [
    {
      icon: FaMapMarkerAlt,
      label: lang === 'en' ? 'Address' : 'Aho dukorera',
      value: content.address,
    },
    {
      icon: FaPhone,
      label: lang === 'en' ? 'Phone' : 'Telefone',
      value: content.phone,
    },
    {
      icon: FaEnvelope,
      label: lang === 'en' ? 'Email' : 'Imeyili',
      value: content.email,
    },
    {
      icon: FaClock,
      label: lang === 'en' ? 'Hours' : 'Amasaha',
      value: content.hours,
    },
  ];

  return (
    <section className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {showHeader && (
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'en' ? 'Get in touch' : 'Twandikire'}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {content.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors"
            >
              <detail.icon className="w-3.5 h-3.5 text-primary mb-2" />
              <p className="text-xs text-slate-500">{detail.label}</p>
              <p className="text-sm text-slate-900 leading-snug">{detail.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-900">
              {content.getInTouch}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              {content.quickResponse}
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-medium text-slate-600 mb-1.5"
                    htmlFor="name"
                  >
                    {content.formName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className={inputClass}
                    placeholder={lang === 'en' ? 'Your full name' : 'Izina ryawe ryuzuye'}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-medium text-slate-600 mb-1.5"
                    htmlFor="email"
                  >
                    {content.formEmail}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className={inputClass}
                    placeholder={lang === 'en' ? 'your@email.com' : 'imeyili@yawe.com'}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                  htmlFor="subject"
                >
                  {content.formSubject}
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className={inputClass}
                  placeholder={lang === 'en' ? 'What is this about?' : 'Ni iki?'}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                  htmlFor="message"
                >
                  {content.formMessage}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className={`${inputClass} resize-none`}
                  placeholder={
                    lang === 'en'
                      ? 'Tell us how we can help...'
                      : 'Dusobanure uko dushobora gufasha...'
                  }
                ></textarea>
              </div>

              {isThankYou && (
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                  <FaCheckCircle className="text-primary w-3.5 h-3.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700">
                    {lang === 'en'
                      ? "Thank you! We'll get back to you soon."
                      : 'Murakoze! Tuzagaruka vuba.'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
                {content.formButton}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-base font-semibold text-slate-900 mb-4">
                {content.faqTitle}
              </h3>

              <div className="divide-y divide-slate-100">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <button
                      type="button"
                      className="flex justify-between items-center gap-4 w-full py-3 text-left"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="text-sm font-medium text-slate-800">
                        {faq[currentLang].question}
                      </span>
                      {expandedFaqs.includes(index) ? (
                        <FaChevronUp className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaqs.includes(index) && (
                      <p className="pb-3 text-sm text-slate-600 leading-relaxed">
                        {faq[currentLang].answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-base font-semibold text-slate-900">
                  {content.findUsTitle}
                </h3>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5145.349364251022!2d30.0595654!3d-1.9465655999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4240db7b3f5%3A0x5256fd511623ef15!2sMakuza%20Peace%20Plaza!5e1!3m2!1sen!2srw!4v1747666821548!5m2!1sen!2srw"
                width="100%"
                height="260"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 block"
                title="Fixo Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
