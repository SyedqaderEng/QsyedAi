'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NewsletterProps {
  id?: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  buttonText: string;
  style?: 'inline' | 'stacked' | 'minimal';
  onClick?: () => void;
}

export default function Newsletter({
  id,
  title,
  subtitle,
  placeholder = 'Enter your email',
  buttonText,
  style = 'inline',
  onClick,
}: NewsletterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email} (Demo mode)`);
    setEmail('');
  };

  if (style === 'inline') {
    return (
      <section
        id={id}
        onClick={onClick}
        className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong p-12 rounded-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              {title}
            </h2>
            {subtitle && <p className="text-gray-400 mb-8">{subtitle}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 glass px-6 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 rounded-xl font-semibold hover:shadow-neon-blue transition-all hover:scale-105"
              >
                {buttonText}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    );
  }

  if (style === 'stacked') {
    return (
      <section
        id={id}
        onClick={onClick}
        className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && <p className="text-gray-400 mb-8">{subtitle}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="w-full glass px-6 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 rounded-xl font-semibold hover:shadow-neon-blue transition-all hover:scale-105"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      onClick={onClick}
      className="py-12 px-6 cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all"
    >
      <div className="container mx-auto max-w-2xl">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
          />
          <button
            type="submit"
            className="glass px-6 py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
