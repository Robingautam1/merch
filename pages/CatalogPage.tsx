import React, { useState } from 'react';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Heavyweight Cotton Tee',
    price: 4500,
    category: 'Apparel',
    image: 'https://picsum.photos/600/800?random=1',
    imageHover: 'https://picsum.photos/600/800?random=2',
    slug: 'heavyweight-tee'
  },
  {
    id: '2',
    title: 'Oversized Hoodie',
    price: 8500,
    category: 'Apparel',
    image: 'https://picsum.photos/600/800?random=3',
    imageHover: 'https://picsum.photos/600/800?random=4',
    slug: 'oversized-hoodie'
  },
  {
    id: '3',
    title: 'Tech Tote Bag',
    price: 3500,
    category: 'Accessories',
    image: 'https://picsum.photos/600/800?random=5',
    imageHover: 'https://picsum.photos/600/800?random=6',
    slug: 'tech-tote'
  },
  {
    id: '4',
    title: 'Dad Cap',
    price: 3200,
    category: 'Accessories',
    image: 'https://picsum.photos/600/800?random=7',
    imageHover: 'https://picsum.photos/600/800?random=8',
    slug: 'dad-cap'
  },
  {
    id: '5',
    title: 'Performance Shorts',
    price: 5500,
    category: 'Apparel',
    image: 'https://picsum.photos/600/800?random=9',
    imageHover: 'https://picsum.photos/600/800?random=10',
    slug: 'perf-shorts'
  },
  {
    id: '6',
    title: 'Ceramic Mug',
    price: 2400,
    category: 'Objects',
    image: 'https://picsum.photos/600/800?random=11',
    imageHover: 'https://picsum.photos/600/800?random=12',
    slug: 'ceramic-mug'
  },
];

const FILTERS = ['All', 'Apparel', 'Accessories', 'Objects'];

export const CatalogPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 container mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Sticky Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-4 text-white">Filter</h3>
              <div className="flex flex-col gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeFilter === filter 
                        ? 'bg-white text-black font-medium' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border">
                <h3 className="font-display font-bold text-xl mb-4 text-white">Sort</h3>
                <select className="w-full bg-surface border border-border text-white p-2 rounded-lg outline-none focus:border-accent">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-8 flex items-baseline justify-between">
            <h1 className="text-4xl font-display font-bold text-white">{activeFilter}</h1>
            <span className="text-gray-500 font-mono text-sm">{filteredProducts.length} Results</span>
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};