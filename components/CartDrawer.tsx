import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';
import { formatPrice } from '../utils';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isOpen, toggleCart, items, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border z-50 flex flex-col"
          >
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-display font-bold text-white">Your Cart</h2>
              <button onClick={toggleCart} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <p>Your cart is empty.</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4"
                    onClick={() => {
                        toggleCart();
                        navigate('/catalog');
                    }}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4 bg-background/50 p-4 rounded-xl border border-border"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.size} / {item.color}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-400">Qty: {item.quantity}</span>
                        <span className="font-mono text-accent">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-surface">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-mono text-white">{formatPrice(total)}</span>
                </div>
                <Button 
                    className="w-full" 
                    onClick={() => {
                        toggleCart();
                        navigate('/checkout');
                    }}
                >
                  Checkout <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};