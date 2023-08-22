import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Product({product}) {
    const VITE_URL_API = import.meta.env.VITE_URL_API;
    //https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg
    return (
      <div className="group relative border px-2 shadow-xl pb-3">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src={`${VITE_URL_API}/${product.image}`} alt={product.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
          </div>
          <div className="mt-4 flex justify-between">
            
            <div>
                <span className="relative flex h-3 w-3 ">
                    <span className='hidden ml-5 font-light group-hover/item:block text-sm'>{!product.in_stock ? 'Unavailable': 'Available'}</span>
                    <span className={`animate-ping absolute h-full w-full rounded-full ${product.in_stock?'bg-green-400':'bg-red-400'} opacity-75`}></span>
                    <span className={`relative rounded-full h-3 w-3 ${product.in_stock?'bg-green-500':'bg-red-500'}`}></span>
                </span>
                <Link to={`/products/${product.product_id}`}>
                    <h3 className="text-md text-gray-700 font-bold hover:text-blue-500">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                            {product.name}
                    </h3>
                </Link>
                
                
                <p className="mt-1 text-sm text-gray-500 ">{product.category.name}</p>
                
                
            </div>
            
            <div>
                <p className="mt-2 text-sm font-medium text-gray-900 rounded px-2 bg-green-200">${product.price}</p>
                {
                    product.discount!=0 && <p className='text-sm text-gray-300'>-<span className="text-sm text-gray-300 line-through">{product.discount}</span>%</p>
                }
            </div>
        </div>
        
      </div>
    )
}

Product.propTypes = {
    product: PropTypes.object.isRequired
};
export default Product;