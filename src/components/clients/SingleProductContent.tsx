import { useEffect, useState } from 'react';
import { IProduct } from '../../types/store';
import productService from '../../state/features/auth/productSlice';
import { useParams, Link } from 'react-router-dom';
import { FaWhatsapp, FaBoxOpen, FaArrowLeft } from 'react-icons/fa';
import SEO from '../SEO';

const SingleProductContent = () => {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [products, setProductsData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  const lang = localStorage.getItem('lang');

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productService.getProductById(id);
        setProductData(response.data || null);
        setMainImage(response.data?.images?.[0] || null);
      } catch (error) {
        console.error('Fetching product failed:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await productService.getAlllProducts();
        setProductsData(response.data || []);
      } catch (error) {
        console.error('Fetching products failed:', error);
      }
    };

    fetchProductData();
    fetchProductsData();
  }, [id]);

  if (!productData && !loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <FaBoxOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-base font-medium text-slate-800">
          {lang === 'en' ? 'Product not found' : 'Igicuruzwa ntikibonetse'}
        </p>
        <Link
          to="/products"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          <FaArrowLeft className="w-3 h-3" />
          {lang === 'en' ? 'Back to products' : 'Subira ku bicuruzwa'}
        </Link>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => p._id !== id).slice(0, 3);
  const productImages = productData?.images?.slice(0, 5) || [];

  return (
    <>
      <SEO
        title={`${productData?.name || 'Product'} | Fixo`}
        description={
          productData?.description?.slice(0, 160) ||
          'Devices and tools offered at accessible prices through Fixo.'
        }
        ogTitle={`${productData?.name || 'Product'} | Fixo`}
        ogImage={mainImage || '/logo.png'}
        ogType="product"
        canonicalUrl={`https://fixo.rw/product/${productData?._id}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <FaArrowLeft className="w-3 h-3" />
          {lang === 'en' ? 'All products' : 'Ibicuruzwa byose'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {productImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border flex-shrink-0 transition-colors ${
                      mainImage === img
                        ? 'border-primary'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
              {loading ? (
                <div className="w-full h-80 animate-pulse bg-slate-100" />
              ) : (
                <img
                  src={mainImage || ''}
                  alt={productData?.name || ''}
                  className="w-full h-80 object-contain"
                />
              )}
            </div>
          </div>

          <div>
            {productData?.category?.name && (
              <p className="text-xs text-slate-500 mb-1.5">
                {productData.category.name}
              </p>
            )}
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              {productData?.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-xl font-semibold text-slate-900">
                RWF {productData?.price?.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">
                {productData?.stock} {lang === 'en' ? 'in stock' : 'bihari'}
              </span>
            </div>

            <p className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
              {productData?.description}
            </p>

            <Link
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              to="tel:+250785450726"
            >
              <FaWhatsapp className="w-4 h-4" />
              {lang === 'en' ? 'Chat now' : 'Tuvugishe'}
            </Link>
          </div>
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">
              {lang === 'en' ? 'Related products' : 'Ibindi bijyanye'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link
                  key={String(product._id)}
                  to={`/product/${product._id}`}
                  className="group flex flex-col rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors"
                >
                  <div className="h-36 bg-slate-100 overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaBoxOpen className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">
                        RWF {product.price?.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">
                        {product.stock} {lang === 'en' ? 'in stock' : 'bihari'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleProductContent;
