'use client';

import { motion } from 'framer-motion';

interface CTAProps {
  id?: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonUrl?: string;
  style?: 'centered' | 'split' | 'minimal';
  onClick?: () => void;
}

export default function CTA({
  id,
  title,
  subtitle,
  buttonText,
  buttonUrl,
  style = 'centered',
  onClick,
}: CTAProps) {
  if (style === 'centered') {
    return (
      <section
        id={id}
        onClick={onClick}
        className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-pink transition-all"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong p-12 md:p-16 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
              )}
              <a
                href={buttonUrl || '#'}
                className="inline-block glass-strong px-10 py-4 rounded-xl text-white text-lg font-semibold hover:shadow-neon-blue transition-all duration-300 hover:scale-105"
              >
                {buttonText}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (style === 'split') {
    return (
      <section
        id={id}
        onClick={onClick}
        className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-pink transition-all"
      >
        <div className="container mx-auto">
          <div className="glass-strong p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xl text-gray-300">{subtitle}</p>
              )}
            </div>
            <a
              href={buttonUrl || '#'}
              className="glass px-10 py-4 rounded-xl text-white text-lg font-semibold hover:shadow-neon-purple transition-all hover:scale-105"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-pink transition-all"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">{title}</h2>
        {subtitle && <p className="text-xl text-gray-300 mb-8">{subtitle}</p>}
        <a
          href={buttonUrl || '#'}
          className="inline-block glass px-8 py-3 rounded-lg text-white font-semibold hover:shadow-neon-blue transition-all hover:scale-105"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
