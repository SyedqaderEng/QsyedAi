'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  fields: string; // comma-separated
  submitText: string;
  style?: 'glass' | 'solid' | 'minimal';
  onClick?: () => void;
}

export default function Form({
  id,
  title,
  subtitle,
  fields,
  submitText,
  style = 'glass',
  onClick,
}: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const fieldList = fields.split(',').map(f => f.trim());

  const containerStyles = {
    glass: 'glass-strong',
    solid: 'bg-gray-800',
    minimal: 'bg-transparent',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! (Demo mode)');
  };

  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all"
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${containerStyles[style]} p-8 md:p-12 rounded-2xl`}
        >
          {(title || subtitle) && (
            <div className="text-center mb-8">
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-gray-400">{subtitle}</p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {fieldList.map((field, idx) => {
              const isTextarea = field.toLowerCase() === 'message' || field.toLowerCase() === 'description';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {field}
                  </label>
                  {isTextarea ? (
                    <textarea
                      name={field}
                      rows={4}
                      className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                      placeholder={`Enter ${field}`}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  ) : (
                    <input
                      type={field.toLowerCase() === 'email' ? 'email' : 'text'}
                      name={field}
                      className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-neon-blue transition-all outline-none"
                      placeholder={`Enter ${field}`}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  )}
                </motion.div>
              );
            })}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              type="submit"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 rounded-lg font-semibold hover:shadow-neon-blue transition-all hover:scale-105"
            >
              {submitText}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
