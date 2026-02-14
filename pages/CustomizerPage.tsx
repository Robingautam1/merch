import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomizerStore, useCartStore } from '../store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatPrice } from '../utils';
import { Check, Upload, RotateCcw } from 'lucide-react';
import { Product } from '../types';

// Mock fetching product details
const getProduct = (id: string): Product => ({
  id,
  title: 'Heavyweight Cotton Tee',
  price: 4500,
  category: 'Apparel',
  image: 'https://picsum.photos/800/800',
  imageHover: '',
  slug: 'heavyweight-tee'
});

const COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#121212' },
  { name: 'Navy', hex: '#1a237e' },
  { name: 'Acid', hex: '#D4FF00' },
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const CustomizerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id || '1');
  
  const { config, setConfig, resetConfig } = useCustomizerStore();
  const { addToCart, toggleCart } = useCartStore();
  
  // Calculate price dynamically
  const basePrice = product.price;
  const printCost = config.uploadedImage ? 1500 : 0;
  const totalPrice = (basePrice + printCost) * config.quantity;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: config.quantity,
      color: config.selectedColor,
      size: config.selectedSize,
      customDesign: config.uploadedImage || undefined,
    });
    toggleCart();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setConfig({ uploadedImage: url });
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row overflow-hidden bg-background">
      
      {/* LEFT: Canvas / Preview */}
      <div className="w-full lg:w-[65%] h-[60vh] lg:h-[calc(100vh-80px)] relative bg-[#0a0a0a] flex items-center justify-center p-8 overflow-hidden">
        {/* Ambient Backlight */}
        <div 
            className="absolute inset-0 opacity-20 transition-colors duration-700"
            style={{ 
                background: `radial-gradient(circle at center, ${config.selectedColor === '#121212' ? '#333' : config.selectedColor}, transparent 70%)` 
            }}
        />

        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-2xl aspect-square"
        >
            {/* T-Shirt Base Image Mockup - In a real app this would be a 3D model or specific masked images */}
            <div className="w-full h-full relative">
                {/* Simplified SVG representation of a T-Shirt for color changing effect */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                    <path 
                        d="M30,30 L20,40 L25,45 L32,38 L32,80 L68,80 L68,38 L75,45 L80,40 L70,30 Q50,35 30,30 Z" 
                        fill={config.selectedColor} 
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                    />
                </svg>

                {/* Uploaded Design Overlay */}
                <AnimatePresence>
                    {config.uploadedImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-white/20 hover:border-accent cursor-move flex items-center justify-center overflow-hidden"
                            drag
                            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                        >
                            <img src={config.uploadedImage} alt="Design" className="w-full h-full object-contain pointer-events-none mix-blend-multiply" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>

        {/* Action Bar for Mobile */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 lg:hidden">
            <button onClick={resetConfig} className="p-3 bg-surface rounded-full text-white border border-border">
                <RotateCcw size={20} />
            </button>
        </div>
      </div>

      {/* RIGHT: Control Panel */}
      <div className="w-full lg:w-[35%] h-auto lg:h-[calc(100vh-80px)] bg-surface/50 backdrop-blur-md border-l border-border p-6 md:p-10 flex flex-col overflow-y-auto">
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{product.title}</h1>
            <p className="text-gray-400">Premium 240gsm Cotton</p>
        </div>

        <div className="space-y-10 flex-1">
            
            {/* Color Selection */}
            <div>
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">Select Color</label>
                <div className="flex gap-4">
                    {COLORS.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => setConfig({ selectedColor: c.hex })}
                            className={`w-10 h-10 rounded-full border border-gray-600 relative transition-transform hover:scale-110 ${config.selectedColor === c.hex ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface' : ''}`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">Size</label>
                <div className="grid grid-cols-5 gap-2">
                    {SIZES.map((s) => (
                        <button
                            key={s}
                            onClick={() => setConfig({ selectedSize: s })}
                            className={`py-3 rounded-lg text-sm font-medium transition-colors ${config.selectedSize === s ? 'bg-white text-black' : 'bg-surface border border-border text-gray-400 hover:text-white'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Design Upload */}
            <div>
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">Customization</label>
                <div className="relative group">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`border border-dashed border-gray-700 rounded-xl p-8 text-center transition-colors group-hover:border-accent ${config.uploadedImage ? 'bg-accent/10' : 'bg-surface'}`}>
                        {config.uploadedImage ? (
                            <div className="flex items-center justify-center gap-2 text-accent">
                                <Check size={18} />
                                <span className="text-sm font-medium">Asset Loaded</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-white">
                                <Upload size={24} />
                                <span className="text-sm">Drop artwork here</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

             {/* Quantity */}
             <div>
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">Quantity</label>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setConfig({ quantity: Math.max(1, config.quantity - 1) })}
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                        -
                    </button>
                    <span className="text-xl font-mono w-8 text-center">{config.quantity}</span>
                    <button 
                        onClick={() => setConfig({ quantity: config.quantity + 1 })}
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                        +
                    </button>
                </div>
             </div>
        </div>

        {/* Footer / Total */}
        <div className="mt-10 pt-6 border-t border-border">
            <div className="flex justify-between items-end mb-6">
                <span className="text-sm text-gray-400">Total Estimate</span>
                <motion.span 
                    key={totalPrice}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl font-mono text-white tracking-tight"
                >
                    {formatPrice(totalPrice)}
                </motion.span>
            </div>
            <Button onClick={handleAddToCart} className="w-full">
                Add to Cart
            </Button>
        </div>
      </div>
    </div>
  );
};