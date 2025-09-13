import { FaShieldAlt, FaLock, FaEye, FaUserShield, FaDatabase, FaCookie, FaGavel, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../components/clients/Header';
import Footer from '../components/clients/Footer';

const PrivacyPolicy = () => {
  const lang = localStorage.getItem('lang') || 'en';

  const content = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'Your privacy and data protection are our top priorities',
      lastUpdated: 'Last updated: January 2024',
      sections: [
        {
          icon: FaShieldAlt,
          title: 'Information We Collect',
          content: [
            'Personal Information: We collect information you provide directly to us, such as when you contact us for support, or use our services. This may include your name, email address, phone number, and payment information.',
            'Technical Information: We automatically collect certain technical information when you use our services, including your IP address, device information, browser type, and usage patterns.',
            'Support Data: When you request technical support, we may collect information about your device, software, and the issues you\'re experiencing to provide effective assistance.'
          ]
        },
        {
          icon: FaLock,
          title: 'How We Use Your Information',
          content: [
            'Service Delivery: We use your information to provide, maintain, and improve our technical support services.',
            'Communication: We use your contact information to communicate with you about your support requests, service updates, and important announcements.',
            'Payment Processing: We use payment information to process transactions and maintain your account.',
            'Security: We use technical information to protect against fraud, abuse, and security threats.'
          ]
        },
        {
          icon: FaEye,
          title: 'Information Sharing',
          content: [
            'We do not sell, trade, or rent your personal information to third parties.',
            'We may share information with trusted service providers who assist us in operating our platform, conducting our business, or serving our users.',
            'We may disclose information when required by law or to protect our rights, property, or safety, or that of our users.',
            'In case of a business transfer, user information may be transferred as part of the assets.'
          ]
        },
        {
          icon: FaUserShield,
          title: 'Your Rights',
          content: [
            'Access: You have the right to access the personal information we hold about you.',
            'Correction: You can request correction of inaccurate or incomplete information.',
            'Deletion: You can request deletion of your personal information, subject to certain exceptions.',
            'Portability: You can request a copy of your data in a structured, machine-readable format.',
            'Objection: You can object to certain processing of your personal information.'
          ]
        },
        {
          icon: FaDatabase,
          title: 'Data Security',
          content: [
            'We implement appropriate technical and organizational measures to protect your personal information.',
            'All data transmission is encrypted using industry-standard protocols.',
            'We regularly review and update our security practices to address emerging threats.',
            'Access to personal information is restricted to authorized personnel only.',
            'We maintain incident response procedures to address any potential data breaches.'
          ]
        },
        {
          icon: FaCookie,
          title: 'Cookies and Tracking',
          content: [
            'We use cookies and similar technologies to enhance your experience on our platform.',
            'Essential cookies are necessary for the platform to function properly.',
            'Analytics cookies help us understand how users interact with our services.',
            'You can control cookie preferences through your browser settings.',
            'Disabling certain cookies may affect the functionality of our services.'
          ]
        },
        {
          icon: FaGavel,
          title: 'Legal Basis',
          content: [
            'We process your personal information based on legitimate business interests, contractual necessity, and legal compliance.',
            'For EU users, we comply with the General Data Protection Regulation (GDPR).',
            'We obtain explicit consent when required by applicable laws.',
            'You can withdraw consent at any time, though this may affect our ability to provide services.',
            'We maintain records of consent and processing activities as required by law.'
          ]
        }
      ],
      contact: {
        title: 'Contact Us',
        description: 'If you have any questions about this Privacy Policy or our data practices, please contact us:',
        email: 'privacy@fixo.rw',
        phone: '(250) 785 450 726',
        address: 'Makuza Peace Plaza, Kigali, Rwanda'
      }
    },
    rw: {
      title: 'Amategeko n\'amabwiriza',
      subtitle: 'Amakuru y\'abatugna ni ingezi kuri twe',
      lastUpdated: 'Yasubiwemo  muri mutarama 2024',
      sections: [
        {
          icon: FaShieldAlt,
          title: 'Amakuru Dukusanya',
          content: [
            'Amakuru y\'umuntu: Dukusanya amakuru y\'utugana  nk\'igihe akora konti, utwandikira udusaba ubufasha, cyangwa ukoresha serivisi zacu. ayo makuru ashobora kuba kuba amazina , imeyili, numero ya telefone, n\'amakuru y\'ubwishyu.',
            'Amakuru y\'ikoranabuhanga: Dukusanya amakuru y\'ikoranabuhanga mu gihe ukoresha serivisi zacu, harimo IP address yawe, amakuru y\'ikoresho, ubwoko bw\'umurongo, n\'imiterere y\'amakuru.',
            'Amakuru y\'Ubufasha: Igihe usaba ubufasha bw\'ikoranabuhanga, dushobora gukusanya amakuru ku bijyanye n\'igikoresho cyawe, software, n\'ibibazo ushaka ko tugufasha gukemura kugira ngo tugufashe neza.'
          ]
        },
        {
          icon: FaLock,
          title: 'Uburyo Dukoresha Amakuru yawe',
          content: [
            'Gutanga Serivisi: Dukoresha amakuru yawe kugira ngo dutange, dukomeze, kandi tunoze serivisi zacu z\'ubufasha bw\'ikoranabuhanga.',
            'Kwiyandikisha: Dukoresha amakuru yo kwiyandikisha kugira ngo tuyandikane nawe ku bijyanye n\'ubusabe bwawe bw\'ubufasha, amakuru ajyanye na serivisi, nandi yose yakenerwa.',
            'Gutanga Ubwishyu: Dukoresha amakuru y\'ubwishyu kugira ngo ubwishyu bukorwe nibikorwa bindi bikomeze.',
            'Umutekano: Dukoresha ikoranabuhanga muguhangana nibyaha ndetse nikoreshwa ribi ryamakuru yabatugana.'
          ]
        },
        {
          icon: FaEye,
          title: 'Gusangiza Amakuru',
          content: [
            'Ntitugurisha, tugurana, cyangwa tugura amakuru yawe y\'umuntu ku bandi bantu.',
            'Dushobora gusangiza amakuru n\'abantu bafite ububasha badufasha mu gutnga serivisi cyangwa gufasha abakoresha bacu.',
            'Dushobora kwerekana amakuru igihe byatangajwe n\'amategeko cyangwa kugira ngo dutabare uburenganzira bwacu, umutungo, cyangwa umutekano, cyangwa w\'abatugana bacu.',
            'Mu gihe cyo guhindura ubucuruzi, amakuru yimurwa nkumutungo.'
          ]
        },
        {
          icon: FaUserShield,
          title: 'Uburenganzira bwawe',
          content: [
            'Kugenzura: Ufite uburenganzira bwo kugenzura amakuru dufite ajyanye nawe.',
            'Gukosora: Urashobora gusaba gukosora amakuru atari yo cyangwa atuzuye.',
            'Gusiba: ushobora gusaba gusiba amakuru yawe cyangwa n\'ibindi bitandukanye bikwerekeye ho.',
            'Gutwara: Ushobora gusaba kopi y\'amakuru yawe mu miterere y\'ikoranabuhanga, ikoresha mudasobwa.',
            'Guhakana: Ushobora kwanga ibindi bikorwa ku amakuru yawe.'
          ]
        },
        {
          icon: FaDatabase,
          title: 'Umutekano w\'Amakuru',
          content: [
            'dukoresha ibikorwa by\'ikoranabuhanaga n\'izindi ngamba zose mu kurinda amakuru yawe.',
            'ihererekanyanya ryamakuru mu bikorwa bitandukanye bikorwa hifashishizwe uburyo bwabugenewe',
            'Dukomeza gusuzuma kandi duhindura ibijyanye n\'umutekano kugira ngo dukemure ibibazo biza by\'umutekano.',
            'kureba no gukoresha amakuru bikorwa nababyemerewe gusa.',
            'Dukomeza amabwiriza yo gukemura ibibazo byose by\'amakuru.'
          ]
        },
        {
          icon: FaCookie,
          title: 'Amakuki, gukurikirana',
          content: [
            'Dukoresha amakuki n\'ibindi bikoresho by\'ikoranabuhanga kugira ngo tunoze serivisi tubaha.',
            'Amakuki aba akenewe kugira ngo ngo tubahe serivisi inoze.',
            'Amakuki y\'ikoranabuhanga atufasha gusobanura uburyo abakoresha bahurira na serivisi zacu.',
            'Urashobora gukoresha amakuki yawe uciye ku masuzuma yawe y\'umurongo.',
            'Gukuraho amakuki atandukanye bishobora kugira ingaruka kuri serivisi zacu.'
          ]
        },
        {
          icon: FaGavel,
          title: 'Amategeko',
          content: [
            'Dukoresha amakuru yawe y\'umuntu ku bijyanye n\'serivisi z\'ubucuruzi, amasezerano, n\'amategeko abigenga. ',
            'Twubahiriza amategeko n\'amabwiriza byabanyaburayi (GDPR).',
            'Dufata amakuru igihe byatangajwe n\'amategeko.',
            'Ushobora gukuraho amakuru igihe cyose, nubwo ibi bishobora kugira ingaruka serivisi zacu.',
            'Dukomeza amakuru tuknayakoresha mub\'ibikorwa by\'ikoranabuhanga nk\'uko biteganywa n\'amategeko.'
          ]
        }
      ],
      contact: {
        title: 'Twandikire',
        description: 'Niba ufite ibibazo ku bijyanye na amakuru yawe, twandikire:',
        email: 'privacy@fixo.rw',
        phone: '(250) 785 450 726',
        address: 'Makuza Peace Plaza, Kigali, Rwanda'
      }
    }
  };

  const currentContent = content[lang === 'rw' ? 'rw' : 'en'];

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-24 h-24 bg-secondary/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-bounce-gentle"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 mb-6">
            <FaShieldAlt className="text-secondary text-lg" />
            <span className="text-secondary font-semibold">
              {lang === 'en' ? 'Privacy & Security' : 'Ubwoba n\'Umutekano'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {currentContent.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            {currentContent.subtitle}
          </p>
          
          <p className="text-sm text-gray-500">
            {currentContent.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-secondaryDark rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-secondary rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {currentContent.contact.title}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {currentContent.contact.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <FaEnvelope className="text-2xl mb-2 mx-auto" />
                <p className="font-semibold">Email</p>
                <p className="opacity-90">{currentContent.contact.email}</p>
              </div>
              <div>
                <FaPhone className="text-2xl mb-2 mx-auto" />
                <p className="font-semibold">{lang === 'en' ? 'Phone' : 'Telefone'}</p>
                <p className="opacity-90">{currentContent.contact.phone}</p>
              </div>
              <div>
                <FaMapMarkerAlt className="text-2xl mb-2 mx-auto" />
                <p className="font-semibold">{lang === 'en' ? 'Address' : 'Aho Turi'}</p>
                <p className="opacity-90">{currentContent.contact.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </div>
  );
};

export default PrivacyPolicy;
