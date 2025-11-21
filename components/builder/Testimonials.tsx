'use client';

import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsProps {
  id?: string;
  title?: string;
  layout?: 'grid' | 'carousel' | 'masonry';
  testimonials?: Testimonial[];
  onClick?: () => void;
}

export default function Testimonials({
  id,
  title,
  layout = 'grid',
  testimonials = [
    {
      quote: 'This product changed our workflow completely!',
      author: 'John Doe',
      role: 'CEO at TechCorp',
      avatar: '',
    },
    {
      quote: 'Amazing experience, highly recommend!',
      author: 'Jane Smith',
      role: 'Designer at Creative Co',
      avatar: '',
    },
    {
      quote: 'Best tool we\'ve ever used for our team.',
      author: 'Mike Johnson',
      role: 'CTO at StartupXYZ',
      avatar: '',
    },
  ],
  onClick,
}: TestimonialsProps) {
  return (
    <section
      id={id}
      onClick={onClick}
      className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-purple transition-all"
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl hover:glass-strong transition-all hover:scale-105"
            >
              <div className="text-neon-yellow text-4xl mb-4">"</div>
              <p className="text-gray-300 mb-6 text-lg italic">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
