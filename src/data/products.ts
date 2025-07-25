export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  weight: string;
  image: string;
  images: string[]; // New field for multiple images
  benefits: string[];
  ingredients: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    fat: string;
    carbohydrates: string;
    fiber: string;
  };
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "premium-makhana",
    name: "Premium Makhana",
    description: "Our flagship product, these premium grade fox nuts are carefully sourced from the heart of Mithila region. Each fox nut is handpicked to ensure superior quality and taste. Rich in protein and low in fat, these makhanas are perfect for health-conscious snackers and those looking to add a nutritional boost to their diet.",
    shortDescription: "Premium quality fox nuts from the heart of Mithila",
    price: 549,
    weight: "250g",
    image: "/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png",
    images: [
      "/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png",
      "/lovable-uploads/6cde9e41-dea8-4d15-8787-d9ee49aca8fe.png",
      // Adding placeholder images for testing
      "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop"
    ],
    benefits: [
      "High in protein and low in fat",
      "Excellent source of antioxidants",
      "Helps control blood sugar levels",
      "Supports heart health",
      "Aids in weight management"
    ],
    ingredients: ["100% Organic Fox Nuts (Euryale Ferox)"],
    nutritionalInfo: {
      calories: "347 kcal per 100g",
      protein: "9.7g per 100g",
      fat: "0.1g per 100g",
      carbohydrates: "76.9g per 100g",
      fiber: "14.5g per 100g"
    },
    inStock: true
  },
  {
    id: "roasted-makhana",
    name: "Roasted Makhana",
    description: "Our specially roasted makhanas are a perfect blend of tradition and taste. Lightly roasted to perfection, these fox nuts offer a delightful crunch with each bite. With no added preservatives or artificial flavors, they retain their natural goodness while providing an enhanced taste experience.",
    shortDescription: "Perfectly roasted fox nuts for a delightful crunch",
    price: 649,
    weight: "250g",
    image: "/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png",
    images: [
      "/lovable-uploads/72f30427-c9c7-472a-a0f9-e397cfc22279.png",
      "/lovable-uploads/6cde9e41-dea8-4d15-8787-d9ee49aca8fe.png",
      // Adding placeholder images for testing
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=500&auto=format&fit=crop"
    ],
    benefits: [
      "Ready-to-eat snack option",
      "Perfect balance of crunch and flavor",
      "No added preservatives or artificial flavors",
      "Rich in magnesium and potassium",
      "Low glycemic index food"
    ],
    ingredients: ["100% Organic Fox Nuts (Euryale Ferox)", "Himalayan Pink Salt (trace)"],
    nutritionalInfo: {
      calories: "365 kcal per 100g",
      protein: "10.2g per 100g",
      fat: "0.3g per 100g",
      carbohydrates: "78.1g per 100g",
      fiber: "13.9g per 100g"
    },
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
