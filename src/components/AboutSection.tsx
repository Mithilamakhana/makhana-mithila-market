
import React from "react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="section bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg"
                alt="Makhana farming"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-12 -right-6 w-2/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20">
              <img
                src="/placeholder.svg"
                alt="Makhana processing"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/20 rounded-full z-0"></div>
          </div>
          
          <div className="lg:pl-12">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Perfect Healthy Snack from the Lakes of Mithila
            </h2>
            <div className="w-20 h-1 bg-accent mb-6"></div>
            <p className="text-lg text-gray-700 mb-6">
              In the heart of Mithila, where pristine lakes and ponds dominate the landscape, we harvest our premium quality fox nuts (makhana). For generations, our families have been cultivating this superfood using traditional methods passed down through centuries.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Each seed is carefully handpicked, sun-dried, and roasted to perfection to preserve its natural goodness and nutritional value. Our commitment to quality and sustainability ensures that you get the finest makhana with authentic flavor.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">High in Protein</h4>
                  <p className="text-gray-600">Rich source of plant-based protein</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Low Glycemic Index</h4>
                  <p className="text-gray-600">Safe for diabetic people</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Gluten-Free</h4>
                  <p className="text-gray-600">Perfect for people with gluten sensitivity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold mb-1">Antioxidant-Rich</h4>
                  <p className="text-gray-600">Helps fight inflammation</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-accent hover:bg-accent/90">Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
