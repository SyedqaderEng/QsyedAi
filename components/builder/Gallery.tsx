'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface GalleryProps {
  id?: string;
  title?: string;
  columns?: '2' | '3' | '4' | '5';
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  images?: string[];
  onClick?: () => void;
}

export default function Gallery({
  id,
  title,
  columns = '3',
  aspectRatio = 'square',
  images = [
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800',
    'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800',
    'https://images.unsplash.com/photo-1635002962298-5f2bef7e315d?w=800',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    'https://images.unsplash.com/photo-1640955014216-75201056c829?w=800',
  ],
  onClick,
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
    '5': 'md:grid-cols-5',
  };

  const aspectClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  return (
    <>
      <section
        id={id}
        onClick={onClick}
        className="py-20 px-6 cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all"
      >
        <div className="container mx-auto">
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

          <div className={`grid ${gridCols[columns]} gap-4`}>
            {images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-xl glass group cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(image);
                }}
              >
                <div className={`${aspectClasses[aspectRatio]} relative`}>
                  <img
                    src={image}
                    alt={`Gallery item ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-semibold">View Image</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-full object-contain rounded-xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 glass-strong px-4 py-2 rounded-lg text-white hover:bg-red-500/20 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
