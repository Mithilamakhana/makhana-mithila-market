
import React from 'react';
import MascotFloating from '@/components/MascotFloating';

const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-mithila-green mb-4">About Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Learn about our journey, mission, and the traditional art of makhana harvesting.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-mithila-green mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Mithila Sattvik Makhana was born out of a passion to bring the authentic taste of 
              Mithila region to households across the country. Our journey began in the serene 
              wetlands of Mithila, where fox nuts have been cultivated for generations.
            </p>
            <p className="text-gray-700 mb-4">
              With deep roots in the traditional methods of harvesting and processing makhana, 
              we have combined age-old wisdom with modern quality standards to deliver premium 
              quality fox nuts that are both nutritious and delicious.
            </p>
            <p className="text-gray-700">
              Our mission is to promote sustainable agriculture while supporting local farmers 
              and preserving the rich cultural heritage of Mithila.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png" 
                alt="Mithila Sattvik Makhana Logo" 
                className="h-72 w-72 md:h-80 md:w-80 object-contain bg-mithila-beige p-8 rounded-full border-4 border-mithila-green"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-mithila-green mb-6 text-center">The Art of Makhana Harvesting</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8 border border-mithila-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-mithila-beige h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-mithila-green">1</span>
                </div>
                <h3 className="text-lg font-semibold text-mithila-green mb-2">Cultivation</h3>
                <p className="text-gray-600">
                  Fox nuts are cultivated in the wetlands of Mithila region, where the soil and water 
                  conditions are perfect for their growth. The plants thrive in shallow ponds and wetlands.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-mithila-beige h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-mithila-green">2</span>
                </div>
                <h3 className="text-lg font-semibold text-mithila-green mb-2">Harvesting</h3>
                <p className="text-gray-600">
                  The seeds are harvested by skilled local farmers who wade through the water to collect 
                  the pods. This labor-intensive process requires experience and expertise.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-mithila-beige h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-mithila-green">3</span>
                </div>
                <h3 className="text-lg font-semibold text-mithila-green mb-2">Processing</h3>
                <p className="text-gray-600">
                  The harvested seeds undergo a traditional roasting process to transform them into the 
                  crispy, light makhanas that we all love. This process requires precise temperature control.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-mithila-green mb-6 text-center">Our Commitment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-mithila-gold/20">
              <h3 className="text-lg font-semibold text-mithila-green mb-3">Quality Assurance</h3>
              <p className="text-gray-700">
                We maintain strict quality control at every step of the production process, from 
                harvesting to packaging. Our fox nuts undergo rigorous testing to ensure they meet 
                the highest standards of quality and safety.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-mithila-gold/20">
              <h3 className="text-lg font-semibold text-mithila-green mb-3">Sustainability</h3>
              <p className="text-gray-700">
                We are committed to sustainable practices that protect the environment and support 
                the local ecosystem. Our harvesting methods are designed to minimize environmental 
                impact and promote biodiversity.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <MascotFloating />
    </div>
  );
};

export default About;
