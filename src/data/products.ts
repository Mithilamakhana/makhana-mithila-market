import brand_product1 from '/pictures/brand_product1.png'
import roasted_product1 from '/pictures/roasted_product1.png'
import pudding_product1 from '/pictures/pudding_product1.png'

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
    image: brand_product1,
    images: [
      brand_product1,
      roasted_product1,
      pudding_product1,
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
    name: "Premium Makhana",
    description: "Our flagship product, these premium grade fox nuts are carefully sourced from the heart of Mithila region. Each fox nut is handpicked to ensure superior quality and taste. Rich in protein and low in fat, these makhanas are perfect for health-conscious snackers and those looking to add a nutritional boost to their diet.",
    shortDescription: "Handpicked fox nuts from Mithila, prized for their superior size and quality",
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
      "High in protein and low in fat",
      "Excellent source of antioxidants",
      "Helps control blood sugar levels",
      "Supports heart health",
      "Aids in weight management"
    ],
    ingredients: ["100% Organic Fox Nuts (Euryale Ferox)", "Handpicked"],
    nutritionalInfo: {
      calories: "347 kcal per 100g",
      protein: "9.7g per 100g",
      fat: "0.1g per 100g",
      carbohydrates: "76.9g per 100g",
      fiber: "14.5g per 100g"
    },
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
