import { useState } from "react";

const ContactsSection = ({ lang }: any) => {
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
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formButton: string;
    faqTitle: string;
    findUsTitle: string;
  };
  const [isThankYou, setThankyou] = useState<boolean>(false);

  const faqs: FAQ[] = [
    {
      en: {
        question: "What technologies do you specialize in?",
        answer:
          "We specialize in web development (React, Node.js), mobile app development (React Native, Flutter), cloud solutions (AWS, Azure), and AI/ML integration.",
      },
      rw: {
        question: "Ni izihe tekinoloji mwihariye?",
        answer:
          "Twihariye muri web development (React, Node.js), mobile app development (React Native, Flutter), cloud solutions (AWS, Azure), na AI/ML integration.",
      },
    },
    {
      en: {
        question: "How can I request a quote for my project?",
        answer:
          "You can request a quote by filling out the contact form on this page or by emailing us directly at info@techcompany.com with your project details.",
      },
      rw: {
        question: "Ni gute nasaba igiciro cy'umushinga wanjye?",
        answer:
          "Ushobora gusaba igiciro wuzuza ifishi yo kwiyandikisha kuri iyi paji cyangwa utwohereza imeyili kuri info@techcompany.com n'ibisobanuro by'umushinga wawe.",
      },
    },
    {
      en: {
        question: "What is your typical development timeline?",
        answer:
          "Project timelines vary based on complexity. Small projects typically take 2-4 weeks, medium projects 1-3 months, and larger enterprise solutions 3-6 months or more.",
      },
      rw: {
        question:
          "Ni igihe kingana iki gisanzwe mufata mu guteza imbere umushinga?",
        answer:
          "Igihe cy'imishinga kiba gitandukanye bitewe n'uburyo umushinga uteye. Imishinga mito ifata ibyumweru 2-4, imishinga yo hagati ifata amezi 1-3, n'imishinga minini ifata amezi 3-6 cyangwa irenga.",
      },
    },
    {
      en: {
        question: "Do you provide ongoing support after project completion?",
        answer:
          "Yes, we offer various support packages tailored to your needs. These include regular maintenance, security updates, feature enhancements, and technical support.",
      },
      rw: {
        question: "Mutanga ubufasha buhoraho nyuma yo kurangiza umushinga?",
        answer:
          "Yego, dutanga amapaki y'ubufasha atandukanye akwiranye n'ibyo ukeneye. Harimo gusana bisanzwe, kuvugurura umutekano, kunoza ibiranga, n'ubufasha bwa tekiniki.",
      },
    },
    {
      en: {
        question: "What technologies do you use for secure payment processing?",
        answer:
          "We integrate secure payment solutions like Stripe, PayPal, and local payment gateways. All implementations follow PCI DSS compliance standards to ensure your customers' data is protected.",
      },
      rw: {
        question: "Ni izihe tekinoloji mukoresha mu kwishyura umutekano?",
        answer:
          "Dushyira hamwe ibisubizo by'ubwishyu bifite umutekano nka Stripe, PayPal,Paypack n'amarembo y'ubwishyu by'ahantu. Ishyirwa mu bikorwa byose bikurikiza amabwiriza ya PCI DSS kugira ngo amakuru y'abakiriya bawe arindwe.",
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
      title: "Contact Us",
      subtitle: "We're here to help with your technology needs",
      address: "Makuza Peace Plaza, Kigali, Rwanda",
      phone: "(250) 782986810",
      email: "support@fixo.rw",
      formName: "Name",
      formEmail: "Email",
      formSubject: "Subject",
      formMessage: "Message",
      formButton: "Send Message",
      faqTitle: "Frequently Asked Questions",
      findUsTitle: "Find Us On Map",
    },
    rw: {
      title: "Twandikire",
      subtitle: "Turi hano kugira ngo tugufashe mu byo ukeneye muri tekinoloji",
      address: "Makuza Peace Plaza, Kigali, Rwanda",
      phone: "(250) 782986810",
      email: "support@fixo.rw",
      formName: "Izina",
      formEmail: "Imeyili",
      formSubject: "Impamvu",
      formMessage: "Ubutumwa",
      formButton: "Ohereza Ubutumwa",
      faqTitle: "Ibibazo Bibazwa Kenshi",
      findUsTitle: "Dushake kuri Map",
    },
  };

  const currentLang = lang === "rw" ? "rw" : "en";
  const content = contactInfo[currentLang];
// handle send message
  const handleSendMessage = (e: any) => {
    e.preventDefault();
    
    setThankyou(true);
  const form = e.target as HTMLFormElement;
  form.reset();
    setTimeout(() => {
      setThankyou(false);
    }, 3000);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
          <p className="text-gray-600 mb-6">{content.subtitle}</p>

          <div className="bg-primary text-white p-6 rounded-lg mb-8">
            <div className="mb-4">
              <p className="font-semibold mb-1">{content.address}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold mb-1">{content.phone}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold mb-1">{content.email}</p>
            </div>
          </div>

          <form className="mb-8" onSubmit={handleSendMessage}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                {content.formName}
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                {content.formEmail}
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="subject">
                {content.formSubject}
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                {content.formMessage}
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
              ></textarea>
            </div>
            {isThankYou && (
              <div className="bg- text-primary p-3 mb-8">
                <p>Thank You For Your Message, We Are Getting Back Soon !</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-secondary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary transition-colors"
            >
              {content.formButton}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6">{content.faqTitle}</h2>
          <div className="mb-8">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b pb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq[currentLang].question}</span>
                  <span>{expandedFaqs.includes(index) ? "−" : "+"}</span>
                </button>
                {expandedFaqs.includes(index) && (
                  <div className="mt-2 text-gray-600">
                    {faq[currentLang].answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">{content.findUsTitle}</h2>
          <div className="w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5145.349364251022!2d30.0595654!3d-1.9465655999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4240db7b3f5%3A0x5256fd511623ef15!2sMakuza%20Peace%20Plaza!5e1!3m2!1sen!2srw!4v1747666821548!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsSection;
