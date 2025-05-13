import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import MakhanaSlideshow from '@/components/MakhanaSlideshow';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-mithila-beige to-mithila-cream py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-mithila-green mb-4">
              From the Heart of Mithila, To Your Home
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Experience the authentic taste of premium quality fox nuts (makhana) 
              harvested from the pristine waters of Mithila region.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-mithila-green hover:bg-mithila-blue text-white text-lg px-8 py-6">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-mithila-green text-mithila-green hover:bg-mithila-green hover:text-white text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 border-4 border-dashed border-mithila-gold rounded-full animate-spin-slow opacity-70"></div>
              <img 
                src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
                alt="Mithila Sattvik Makhana Logo" 
                className="h-64 w-64 md:h-96 md:w-96 object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Makhana Info Slideshow Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-mithila-blue mb-4">Discover Our Makhana</h2>
            <div className="w-20 h-1 bg-mithila-gold mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Learn about the exceptional qualities that make our fox nuts a premium healthy superfood.
            </p>
          </div>
          
          <MakhanaSlideshow />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mithila-green mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our range of premium quality makhana products, carefully sourced and 
              packaged to bring the authentic taste of Mithila to your doorstep.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-mithila-orange hover:bg-mithila-gold text-white">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-mithila-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mithila-green mb-4">Why Choose Our Makhana?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our fox nuts are not just delicious but packed with numerous health benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-mithila-gold/20">
              <h3 className="text-xl font-semibold text-mithila-green mb-3">100% Natural</h3>
              <p className="text-gray-600">
                Harvested from the pristine waters of Mithila region, our makhanas are 100% natural 
                and free from any artificial additives or preservatives.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-mithila-gold/20">
              <h3 className="text-xl font-semibold text-mithila-green mb-3">Nutritional Powerhouse</h3>
              <p className="text-gray-600">
                Rich in protein, low in fat, and packed with antioxidants, makhanas are a perfect 
                snack for health-conscious individuals and fitness enthusiasts.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-mithila-gold/20">
              <h3 className="text-xl font-semibold text-mithila-green mb-3">Traditional Harvesting</h3>
              <p className="text-gray-600">
                We follow traditional harvesting methods that have been passed down through generations, 
                ensuring the highest quality and authentic taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mithila-green mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-mithila-cream p-6 rounded-lg shadow-md border border-mithila-gold/20">
              <p className="text-gray-600 italic mb-4">
                "I've tried many makhana brands, but Mithila Sattvik Makhana stands out for its 
                exceptional quality and taste. The fox nuts are perfectly sized and have a wonderful crunch!"
              </p>
              <p className="font-semibold text-mithila-green">- Ananya S., Delhi</p>
            </div>
            
            <div className="bg-mithila-cream p-6 rounded-lg shadow-md border border-mithila-gold/20">
              <p className="text-gray-600 italic mb-4">
                "As someone who's very health conscious, I appreciate that these makhanas are 100% natural. 
                They've become my go-to snack during work hours and have helped me avoid unhealthy alternatives."
              </p>
              <p className="font-semibold text-mithila-green">- Rajesh K., Mumbai</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
