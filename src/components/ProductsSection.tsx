
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Classic Makhana",
    description: "Plain roasted fox nuts - perfect natural snack",
    price: "$4.99",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Spicy Makhana",
    description: "Delicious spicy roasted fox nuts with herbs",
    price: "$5.49",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Sweet Makhana",
    description: "Caramelized fox nuts with a hint of sweetness",
    price: "$5.99",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Premium Gift Box",
    description: "Assortment of all flavors in an elegant gift box",
    price: "$15.99",
    image: "/placeholder.svg",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="section bg-white">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Products</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Discover our range of carefully crafted makhana products, harvested from the lakes of Mithila and processed with love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative pt-[100%] bg-secondary/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: product.description }} />
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-accent hover:bg-accent/90">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
