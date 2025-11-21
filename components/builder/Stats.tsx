'use client';

import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  id?: string;
  title?: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
  stats?: Stat[];
  onClick?: () => void;
}

export default function Stats({
  id,
  title,
  layout = 'horizontal',
  stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50M+', label: 'API Calls' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ],
  onClick,
}: StatsProps) {
  const layoutClass = {
    horizontal: 'flex flex-wrap justify-center gap-12',
    vertical: 'flex flex-col items-center gap-8',
    grid: 'grid md:grid-cols-4 gap-8',
  };

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
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
        )}

        <div className={layoutClass[layout]}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center glass p-8 rounded-2xl hover:glass-strong transition-all hover:scale-105"
            >
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
