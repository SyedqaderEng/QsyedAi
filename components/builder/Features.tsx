'use client';

import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  id?: string;
  title?: string;
  subtitle?: string;
  columns?: '2' | '3' | '4';
  style?: 'glass' | 'solid' | 'bordered';
  features?: Feature[];
  onClick?: () => void;
}

export default function Features({
  id,
  title,
  subtitle,
  columns = '3',
  style = 'glass',
  features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance',
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern and elegant user interface',
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Enterprise-grade security built-in',
    },
  ],
  onClick,
}: FeaturesProps) {
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  };

  const cardStyles = {
    glass: 'glass hover:glass-strong',
    solid: 'bg-gray-800/50',
    bordered: 'border-2 border-gray-700 bg-transparent',
  };

  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-purple transition-all"
    >
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${cardStyles[style]} p-8 rounded-2xl hover:scale-105 transition-all duration-300 hover:shadow-neon-blue`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-neon-blue">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
