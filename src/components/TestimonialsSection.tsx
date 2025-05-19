
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    text: "These makhanas are absolutely delicious! The quality is exceptional, and they make for the perfect guilt-free snack. I always keep a pack in my bag.",
    name: "Priya Singh",
    title: "Nutritionist",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    text: "I've tried many brands of fox nuts, but Makhana Mithila stands out for their freshness and flavor. My kids love the sweet variety, and I appreciate the health benefits!",
    name: "Rajesh Kumar",
    title: "Health Coach",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    text: "As someone with diabetes, finding tasty low-glycemic snacks is challenging. These makhanas have been a game-changer for me. The spicy flavor is my favorite!",
    name: "Anjali Sharma",
    title: "Regular Customer",
    avatar: "/placeholder.svg",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section bg-white">
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear what our satisfied customers have to say about Makhana Mithila products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-secondary border-none h-full">
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <svg
                      className="w-10 h-10 text-primary/30"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.7 25.4c-1.9 0-3.5-0.7-4.8-2-1.3-1.3-2-3-2-4.9 0-1.6 0.4-3.2 1.3-4.7 0.9-1.5 2-2.8 3.4-3.9 1.5-1.1 2.9-1.9 4.3-2.5 1.4-0.6 3-1 4.7-1.2l0.4 2.5c-2.3 0.2-4.3 0.8-6 1.8-1.8 1-3 2.3-3.7 3.9 0.3-0.2 0.7-0.3 1.2-0.4 0.4-0.1 0.8-0.2 1.2-0.2 1.8 0 3.2 0.6 4.4 1.7 1.1 1.1 1.7 2.6 1.7 4.4 0 1.8-0.6 3.3-1.8 4.5-1.1 1.3-2.6 1.9-4.3 1.9z"></path>
                      <path d="M24.7 25.4c-1.9 0-3.5-0.7-4.8-2-1.3-1.3-2-3-2-4.9 0-1.6 0.4-3.2 1.3-4.7 0.9-1.5 2-2.8 3.4-3.9 1.5-1.1 2.9-1.9 4.3-2.5 1.4-0.6 3-1 4.7-1.2l0.4 2.5c-2.3 0.2-4.3 0.8-6 1.8-1.8 1-3 2.3-3.7 3.9 0.3-0.2 0.7-0.3 1.2-0.4 0.4-0.1 0.8-0.2 1.2-0.2 1.8 0 3.2 0.6 4.4 1.7 1.1 1.1 1.7 2.6 1.7 4.4 0 1.8-0.6 3.3-1.8 4.5-1.1 1.3-2.6 1.9-4.3 1.9z"></path>
                    </svg>
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
