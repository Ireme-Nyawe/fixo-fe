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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'en' ? 'Privacy & security' : "Ibanga n'umutekano"}
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {currentContent.title}
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {currentContent.subtitle}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              {currentContent.lastUpdated}
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <section key={index}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <h2 className="text-base font-semibold text-slate-900">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-3 sm:pl-10">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm text-slate-600 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-slate-200 p-6">
            <h2 className="text-base font-semibold text-slate-900">
              {currentContent.contact.title}
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
              {currentContent.contact.description}
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: FaEnvelope,
                  label: 'Email',
                  value: currentContent.contact.email,
                  href: `mailto:${currentContent.contact.email}`,
                },
                {
                  icon: FaPhone,
                  label: lang === 'en' ? 'Phone' : 'Telefone',
                  value: currentContent.contact.phone,
                  href: 'tel:+250785450726',
                },
                {
                  icon: FaMapMarkerAlt,
                  label: lang === 'en' ? 'Address' : 'Aho turi',
                  value: currentContent.contact.address,
                  href: null,
                },
              ].map((item) => (
                <div key={item.label}>
                  <item.icon className="w-3.5 h-3.5 text-primary mb-2" />
                  <p className="text-xs text-slate-500">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-slate-900 hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-900">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default PrivacyPolicy;
