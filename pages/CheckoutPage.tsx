import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store';
import { formatPrice } from '../utils';
import { motion } from 'framer-motion';

export const CheckoutPage: React.FC = () => {
  const { items } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [step, setStep] = useState(1);

  const steps = ['Information', 'Shipping', 'Payment'];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 container mx-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left: Form */}
        <div>
           {/* Breadcrumbs */}
           <div className="flex items-center gap-4 mb-12 text-sm">
            {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-4">
                    <span className={`${step === i + 1 ? 'text-accent' : step > i + 1 ? 'text-white' : 'text-gray-600'}`}>
                        {s}
                    </span>
                    {i < steps.length - 1 && <span className="text-gray-700">/</span>}
                </div>
            ))}
           </div>

           <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
           >
                <h2 className="text-3xl font-display font-bold text-white">Contact Information</h2>
                <Input label="Email Address" type="email" />
                
                <h2 className="text-3xl font-display font-bold text-white pt-8">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-6">
                    <Input label="First Name" />
                    <Input label="Last Name" />
                </div>
                <Input label="Address" />
                <Input label="Apartment, suite, etc." />
                <div className="grid grid-cols-3 gap-6">
                    <Input label="City" className="col-span-1" />
                    <Input label="Country" className="col-span-1" />
                    <Input label="Postal Code" className="col-span-1" />
                </div>

                <div className="pt-8">
                    <Button onClick={() => setStep(step + 1)} className="w-full md:w-auto">
                        Continue to Shipping
                    </Button>
                </div>
           </motion.div>
        </div>

        {/* Right: Summary */}
        <div className="bg-surface p-8 rounded-3xl h-fit border border-border">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
                {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden relative">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                             <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                                {item.quantity}
                             </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">{item.title}</h4>
                            <p className="text-xs text-gray-400">{item.size} / {item.color}</p>
                        </div>
                        <span className="text-sm font-mono text-white">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                ))}
            </div>
            
            <div className="border-t border-border pt-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                    <span>Shipping</span>
                    <span>Calculated next step</span>
                </div>
            </div>

            <div className="border-t border-border mt-6 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-mono text-accent">{formatPrice(total)}</span>
            </div>
        </div>

      </div>
    </div>
  );
};