import Footer from '../components/clients/Footer'
import Header from '../components/clients/Header'
import SingleProductContent from '../components/clients/SingleProductContent'

const SingleProduct = () => {
  const lang = localStorage.getItem('lang') || 'en';
  return (
    <div>
    <Header />
    <SingleProductContent />
    <Footer lang={lang} />
  </div>
  )
}

export default SingleProduct
