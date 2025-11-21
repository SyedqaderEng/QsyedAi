'use client';

import { motion } from 'framer-motion';

interface LogoCloudProps {
  id?: string;
  title?: string;
  grayscale?: boolean;
  logos?: Array<{
    name: string;
    url: string;
  }>;
  onClick?: () => void;
}

export default function LogoCloud({
  id,
  title,
  grayscale = true,
  logos = [
    { name: 'Company 1', url: 'https://via.placeholder.com/150x60?text=Logo+1' },
    { name: 'Company 2', url: 'https://via.placeholder.com/150x60?text=Logo+2' },
    { name: 'Company 3', url: 'https://via.placeholder.com/150x60?text=Logo+3' },
    { name: 'Company 4', url: 'https://via.placeholder.com/150x60?text=Logo+4' },
    { name: 'Company 5', url: 'https://via.placeholder.com/150x60?text=Logo+5' },
    { name: 'Company 6', url: 'https://via.placeholder.com/150x60?text=Logo+6' },
  ],
  onClick,
}: LogoCloudProps) {
  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-green transition-all"
    >
      <div className="container mx-auto">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-center p-6 glass rounded-xl hover:glass-strong transition-all hover:scale-110"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className={`w-full h-auto max-h-12 object-contain ${
                  grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : 'opacity-80 hover:opacity-100'
                } transition-all duration-300`}
              />
            </motion.div>
          ))}
        </div>

        {/* Infinite scroll animation version */}
        <div className="mt-12 relative overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-32 h-16 glass rounded-xl flex items-center justify-center p-4"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className={`w-full h-full object-contain ${
                    grayscale ? 'grayscale opacity-50' : 'opacity-70'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
