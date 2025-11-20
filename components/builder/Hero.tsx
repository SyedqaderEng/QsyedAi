'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  id?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  align?: 'left' | 'center' | 'right';
  backgroundStyle?: 'gradient' | 'glass' | 'solid';
  onClick?: () => void;
}

export default function Hero({
  id,
  title,
  subtitle,
  ctaText,
  ctaUrl,
  secondaryCtaText,
  secondaryCtaUrl,
  align = 'center',
  backgroundStyle = 'gradient',
  onClick,
}: HeroProps) {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900',
    glass: 'glass-strong',
    solid: 'bg-gray-900',
  };

  return (
    <section
      id={id}
      onClick={onClick}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${backgroundClasses[backgroundStyle]} cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all`}
    >
      {/* Animated background effects */}
      {backgroundStyle === 'gradient' && (
        <>
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-neon-purple/20 to-transparent rounded-full blur-3xl animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </>
      )}

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex flex-col ${alignmentClasses[align]} max-w-5xl mx-auto`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
              {subtitle}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-wrap gap-4 mt-4">
              {ctaText && (
                <a
                  href={ctaUrl || '#'}
                  className="glass-strong px-8 py-4 rounded-xl text-white font-semibold hover:shadow-neon-blue transition-all duration-300 hover:scale-105"
                >
                  {ctaText}
                </a>
              )}
              {secondaryCtaText && (
                <a
                  href={secondaryCtaUrl || '#'}
                  className="glass px-8 py-4 rounded-xl text-white font-semibold hover:shadow-neon-purple transition-all duration-300 hover:scale-105"
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
