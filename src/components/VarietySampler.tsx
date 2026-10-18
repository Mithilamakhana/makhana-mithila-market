import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Package } from 'lucide-react';
import { getProductById, type Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

const samplerProducts = ['flavored-makhana', 'roasted-makhana', 'premium-makhana']
  .map(getProductById)
  .filter((product): product is Product => product !== undefined);

const originalPrice = samplerProducts.reduce((total, product) => total + product.price, 0);
const samplerPrice = originalPrice - 550;

const VarietySampler = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const inStock = samplerProducts.length === 3 && samplerProducts.every((product) => product.inStock);

  const addSamplerToCart = () => {
    if (!inStock) return;

    samplerProducts.forEach((product) => addToCart(product));
    toast({
      title: 'Sampler added to your cart',
      description: 'Three varieties, with Festival Offer, free delivery and ₹100 extra off included.',
    });
    navigate('/cart');
  };

  return (
    <section aria-labelledby="sampler-title" className="my-8 border-y border-mithila-green/20 bg-mithila-beige/60 py-6 sm:my-10 sm:py-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-mithila-green">
            <Package className="h-4 w-4" aria-hidden="true" />
            TRY ALL THREE
          </div>
          <h2 id="sampler-title" className="text-xl font-bold text-mithila-green sm:text-2xl">
            Mithila Variety Sampler
          </h2>
          <p className="mt-1 text-sm text-gray-700">
            Shressth Jumbo, Sattvik Select, and Makhana Mixx — one of each.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
            <span className="text-xl font-bold text-mithila-green">₹{samplerPrice}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-mithila-green">
              <Check className="h-4 w-4" aria-hidden="true" /> Save ₹550
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-600">Includes ₹150 Festival Offer off each pack, an extra ₹100 trio discount, and free delivery.</p>
        </div>

        <div className="flex shrink-0 items-center justify-center gap-3 sm:gap-4" aria-label="One pack of each sampler variety">
          {samplerProducts.map((product) => (
            <div key={product.id} className="flex w-20 flex-col items-center gap-1 sm:w-24">
              <img src={product.image} alt={product.name} className="h-16 w-full object-contain sm:h-20" />
              <span className="w-full text-center text-[11px] leading-tight text-gray-700">1 × {product.name}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={addSamplerToCart}
          disabled={!inStock}
          className="shrink-0 bg-mithila-green text-white hover:bg-mithila-blue"
        >
          {inStock ? 'Add sampler to cart' : 'Currently unavailable'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};

export default VarietySampler;