import teak_front from '/pictures/brand_product1.jpg'
import teak_back from '/pictures/teak_back.jpg'
import orange_front from '/pictures/orange_front.jpg'
import orange_back from '/pictures/orange_back.jpg'
import Jumbo_back from '/pictures/Jumbo_back.jpg'
import Jumbo_front from '/pictures/Jumbo_front.jpg'
import new_makhana_hd from '/pictures/new_makhana_hd.jpg'
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
    name: "Makhana Mixx",
    description: "Discover the authentic taste of Mithila with Makhana Mixx – a carefully curated blend of premium-grade fox nuts (makhana) featuring a mix of 4, 5, and 6 sutta sizes. This unique combination ensures the perfect balance of texture, crunch, and flavor in every bite. Sourced directly from the fertile lands of Mithila and processed with the utmost care, our makhana mix brings together variety and quality in one wholesome pack.",
    shortDescription: "A premium blend of 4, 5 & 6 sutta-sized fox nuts, handpicked from the heart of Mithila.",
    price: 101,
    weight: "200g",
    image: teak_front,
    images: [
      teak_front,
      teak_back,
      new_makhana_hd,
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
    name: "Sattvik Select",
    description: "Our flagship product, these premium grade fox nuts are carefully sourced from the heart of Mithila region. Each fox nut is handpicked to ensure superior quality and taste. Rich in protein and low in fat, these makhanas are perfect for health-conscious snackers and those looking to add a nutritional boost to their diet.",
    shortDescription: "Handpicked fox nuts from Mithila, prized for their superior 5+ sutta size and unmatched quality.",
    price: 1,
    weight: "200g",
    image: orange_front,
    images: [orange_front,
      orange_back,
      new_makhana_hd,
      pudding_product1],
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
  },
  {
    id: "flavored-makhana",
    name: "Shressth Jumbo",
    description: "At Shressth Jumbo, we believe that size matters—especially when it comes to taste and crunch! That’s why we carefully handpick only the biggest, fluffiest makhanas from the harvest. Each piece is selected for its superior size and texture, ensuring a premium snacking experience.No broken bits, no compromises—just the finest, crispiest lotus seeds nature has to offer.",
    shortDescription: "Handpicked Jumbo Makhana – Only the Best",
    price: 600,
    weight: "185g",
    image: Jumbo_front,
    images: [
      Jumbo_front,
      Jumbo_back,
      new_makhana_hd,
    ],
    benefits: [
      "Rich in flavor and nutrients",
      "Low calorie healthy snack",
      "Perfect for evening cravings",
      "Natural source of calcium",
      "Gluten-free and vegan"
    ],
    ingredients: ["100% Organic Fox Nuts (Euryale Ferox)", "Handpicked"],
    nutritionalInfo: {
      calories: "360 kcal per 100g",
      protein: "9.5g per 100g",
      fat: "1.2g per 100g",
      carbohydrates: "75.8g per 100g",
      fiber: "14.0g per 100g"
    },
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
