
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Quality <span className="text-primary">Makhana</span> From the Heart of Mithila
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Discover the perfect healthy snack - our premium fox nuts are hand-harvested, 
              carefully roasted, and packed with nutrition.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-accent text-white hover:bg-accent/90 text-lg px-8 py-6">
                Shop Products
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
            <div className="flex items-center mt-8 space-x-6">
              <div>
                <p className="font-bold text-2xl">100%</p>
                <p className="text-sm text-gray-700">Natural</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="font-bold text-2xl">Premium</p>
                <p className="text-sm text-gray-700">Quality</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="font-bold text-2xl">Organic</p>
                <p className="text-sm text-gray-700">Certified</p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center fade-in">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent/10 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-primary/10 rounded-full"></div>
              <div className="bg-white p-6 rounded-2xl shadow-xl relative z-10">
                <img
                  src="/placeholder.svg"
                  alt="Premium Makhana"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
