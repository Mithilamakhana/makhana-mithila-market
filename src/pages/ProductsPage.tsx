
import React from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import MascotFloating from '@/components/MascotFloating';

const ProductsPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-mithila-green mb-4">Our Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our range of premium quality makhana products, harvested from the heart of Mithila 
            and delivered fresh to your doorstep.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <MascotFloating />
    </div>
  );
};

export default ProductsPage;
