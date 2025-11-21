'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  id?: string;
  title?: string;
  layout?: 'accordion' | 'grid' | 'list';
  faqs?: FAQItem[];
  onClick?: () => void;
}

export default function FAQ({
  id,
  title,
  layout = 'accordion',
  faqs = [
    {
      question: 'How does it work?',
      answer: 'It works by combining AI with modern web technologies to create stunning websites.',
    },
    {
      question: 'What is the pricing?',
      answer: 'We offer flexible pricing plans starting from $9/month. Check our pricing page for details.',
    },
    {
      question: 'Can I export my site?',
      answer: 'Yes! You can export your site as HTML/JSX or publish directly to Vercel.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial with full access to all features.',
    },
  ],
  onClick,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (layout === 'accordion') {
    return (
      <section
        id={id}
        onClick={onClick}
        className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-purple transition-all"
      >
        <div className="container mx-auto max-w-3xl">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
            >
              {title}
            </motion.h2>
          )}

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex(openIndex === idx ? null : idx);
                  }}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:glass-strong transition-all"
                >
                  <span className="font-semibold text-white text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`text-neon-blue transition-transform ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-purple transition-all"
    >
      <div className="container mx-auto">
        {title && (
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            {title}
          </h2>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <h3 className="font-semibold text-white text-lg mb-3">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
