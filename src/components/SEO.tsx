import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
}

const SEO = ({
  title = 'Fixo | Rwanda’s On-Demand Tech Support Platform',
  description = 'Fixo helps Rwandans get live video support to fix phones, PCs, and navigate government services. Pay instantly via mobile money.',
  keywords = 'fixo rwanda, fix phone rwanda, tech support rwanda, pc repair rwanda, government e-services help, online support',
  author = 'Inono Tech Group',
  ogTitle,
  ogDescription,
  ogImage = '/logo.svg',
  ogUrl,
  ogType = 'Service',
  twitterCard = 'summary_large_image',
  twitterCreator = '@inonotechgroup',
  canonicalUrl,
}: SEOProps) => {
  const location = useLocation();

  const path = location.pathname;

  const dynamicOGImage = () => {
    if (path.startsWith('/services')) return '/og/services.jpg';
    if (path.startsWith('/products')) return '/og/support.jpg';
    if (path.startsWith('/contact')) return '/og/about.jpg';
    return '/logo.svg';
  };

  const ogImageFinal = ogImage || dynamicOGImage();

  const isStaffRoute = location.pathname.startsWith('/staff');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'On-Demand Tech Support',
    provider: {
      '@type': 'Organization',
      name: 'Fixo',
      url: 'https://fixo.rw',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fixo.rw/logo.svg',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'Rwanda',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://fixo.rw',
      servicePhone: '+250788923011',
      availableLanguage: ['en', 'rw'],
    },
    description: description,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={isStaffRoute ? 'noindex, nofollow' : 'index, follow'}
      />

      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImageFinal} />
      <meta property="og:url" content={ogUrl || currentUrl} />
      <meta property="og:type" content={ogType} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImageFinal} />
      <meta name="twitter:creator" content={twitterCreator} />

      <link rel="canonical" href={canonicalUrl || currentUrl} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
