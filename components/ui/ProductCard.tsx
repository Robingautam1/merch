import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { formatPrice } from '../../utils';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={product.imageHover}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button className="w-full bg-white text-black py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent transition-colors">
            <Plus size={16} />
            Customize
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-white group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-400">{product.category}</p>
        </div>
        <span className="text-white font-mono">{formatPrice(product.price)}</span>
      </div>
    </motion.div>
  );
};