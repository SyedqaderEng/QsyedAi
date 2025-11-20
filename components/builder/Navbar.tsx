'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  id?: string;
  logo: string;
  menuItems: string; // comma-separated
  ctaText?: string;
  ctaUrl?: string;
  transparent?: boolean;
  onClick?: () => void;
}

export default function Navbar({
  id,
  logo,
  menuItems,
  ctaText,
  ctaUrl,
  transparent = false,
  onClick,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = menuItems.split(',').map(item => item.trim());

  return (
    <nav
      id={id}
      onClick={onClick}
      className={`fixed top-0 left-0 right-0 z-50 ${
        transparent ? 'bg-transparent' : 'glass-strong'
      } backdrop-blur-lg cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
          >
            {logo}
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item, idx) => (
              <motion.a
                key={idx}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-gray-300 hover:text-neon-blue transition-colors"
              >
                {item}
              </motion.a>
            ))}
            {ctaText && (
              <a
                href={ctaUrl || '#'}
                className="glass px-6 py-2 rounded-lg text-white font-semibold hover:shadow-neon-purple transition-all hover:scale-105"
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-strong rounded-xl p-4"
          >
            {items.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-300 hover:text-neon-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            {ctaText && (
              <a
                href={ctaUrl || '#'}
                className="block mt-2 glass px-6 py-2 rounded-lg text-white font-semibold text-center"
              >
                {ctaText}
              </a>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
