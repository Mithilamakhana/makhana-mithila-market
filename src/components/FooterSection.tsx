
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FooterSection = () => {
  return (
    <footer id="contact" className="bg-primary text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">
              Makhana <span className="text-accent">Mithila</span>
            </h3>
            <p className="mb-4 text-white/80">
              Premium quality fox nuts from the heart of Mithila, prepared with love and tradition.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/80 hover:text-accent transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/80 hover:text-accent transition-colors">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-white/80">
                <span className="mr-2">📍</span> Mithila, Bihar, India
              </li>
              <li className="flex items-center text-white/80">
                <span className="mr-2">📞</span> +91 98765 43210
              </li>
              <li className="flex items-center text-white/80">
                <span className="mr-2">✉️</span> info@makhanamithila.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-white/80">
              Subscribe to our newsletter for updates, recipes, and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-accent hover:bg-accent/90">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container text-center text-white/70">
          <p>© {new Date().getFullYear()} Makhana Mithila. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
