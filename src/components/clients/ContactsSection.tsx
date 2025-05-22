import { useState } from 'react';

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
          "Just click the 'Call Support' button and you’ll be connected to a technician via video. You explain your issue, they guide you through solutions, and at the end, they send a payment request directly to your phone.",
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
      phone: '(250) 782986810',
      email: 'support@fixo.rw',
      formName: 'Name',
      formEmail: 'Email',
      formSubject: 'Subject',
      formMessage: 'Message',
      formButton: 'Send Message',
      faqTitle: 'Frequently Asked Questions',
      findUsTitle: 'Find Us On Map',
    },
    rw: {
      title: 'Twandikire',
      subtitle: 'Turi hano kugira ngo tugufashe mu byo ukeneye muri tekinoloji',
      address: 'Makuza Peace Plaza, Kigali, Rwanda',
      phone: '(250) 782986810',
      email: 'support@fixo.rw',
      formName: 'Izina',
      formEmail: 'Imeyili',
      formSubject: 'Impamvu',
      formMessage: 'Ubutumwa',
      formButton: 'Ohereza Ubutumwa',
      faqTitle: 'Ibibazo Bibazwa Kenshi',
      findUsTitle: 'Dushake kuri Map',
    },
  };

  const currentLang = lang === 'rw' ? 'rw' : 'en';
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
                  <span>{expandedFaqs.includes(index) ? '−' : '+'}</span>
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
