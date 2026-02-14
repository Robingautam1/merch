import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ArrowRight, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { 
    name: 'Apparel', 
    image: 'https://picsum.photos/800/600?grayscale&blur=2',
    videoPreview: 'https://picsum.photos/800/600' // Placeholder for video
  },
  { 
    name: 'Accessories', 
    image: 'https://picsum.photos/800/601?grayscale&blur=2',
    videoPreview: 'https://picsum.photos/800/601'
  },
  { 
    name: 'Objects', 
    image: 'https://picsum.photos/800/602?grayscale&blur=2',
    videoPreview: 'https://picsum.photos/800/602'
  }
];

const logos = ["Acme Corp", "Globex", "Soylent", "Umbrella", "Cyberdyne", "Stark Ind", "Wayne Ent", "Massive Dynamic"];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-background overflow-hidden">
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Floating Product (Parallax) */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute z-10 w-[600px] h-[600px] hidden md:block pointer-events-none"
        >
             {/* Using a placeholder that looks like a floating object */}
            <img 
                src="https://picsum.photos/id/445/800/800" 
                alt="Hero Product" 
                className="w-full h-full object-cover rounded-full mix-blend-luminosity opacity-80"
                style={{ filter: "contrast(1.2)" }} 
            />
        </motion.div>

        {/* Typography Overlay */}
        <div className="relative z-20 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[10rem] leading-none font-display font-black tracking-tighter mix-blend-overlay text-white select-none"
          >
            WEAR
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[10rem] leading-none font-display font-black tracking-tighter text-white select-none"
          >
            YOUR MIND<span className="text-accent">.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Button onClick={() => navigate('/catalog')}>
              Start Creating <MoveRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase animate-bounce"
        >
            Scroll to Explore
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 bg-surface border-y border-border overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <span key={i} className="text-4xl font-display font-bold text-white/20 mx-12 uppercase">
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* Category Reveal Section */}
      <section className="py-32 px-6 container mx-auto">
        <h2 className="text-sm font-mono text-accent mb-12 tracking-widest uppercase">Collections</h2>
        
        <div className="space-y-4">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[30vh] md:h-[40vh] w-full overflow-hidden rounded-3xl cursor-pointer"
              onClick={() => navigate('/catalog')}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16">
                <h3 className="text-4xl md:text-7xl font-display font-bold text-white group-hover:translate-x-4 transition-transform duration-500">
                    {category.name}
                </h3>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                    <ArrowRight className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
       {/* Statement */}
       <section className="py-40 px-6 bg-surface text-center">
            <div className="max-w-4xl mx-auto">
                <p className="text-3xl md:text-5xl font-light text-white leading-tight">
                    "Engineered for Expression. Premium textiles, archival inks, your vision. We don't just print shirts; we manifest ideas into wearable reality."
                </p>
            </div>
       </section>
    </div>
  );
};