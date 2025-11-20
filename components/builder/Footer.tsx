'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Github, Linkedin } from 'lucide-react';

interface FooterColumn {
  title: string;
  links: string[];
}

interface FooterProps {
  id?: string;
  companyName: string;
  description?: string;
  columns?: FooterColumn[];
  showSocial?: boolean;
  onClick?: () => void;
}

export default function Footer({
  id,
  companyName,
  description,
  columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers'] },
  ],
  showSocial = true,
  onClick,
}: FooterProps) {
  return (
    <footer
      id={id}
      onClick={onClick}
      className="glass-strong py-12 px-6 mt-20 cursor-pointer hover:ring-2 hover:ring-neon-blue transition-all"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              {companyName}
            </h3>
            {description && (
              <p className="text-gray-400 mb-4 max-w-md">{description}</p>
            )}
            {showSocial && (
              <div className="flex gap-4">
                <a
                  href="#"
                  className="glass p-2 rounded-lg hover:shadow-neon-blue transition-all"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="glass p-2 rounded-lg hover:shadow-neon-blue transition-all"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="glass p-2 rounded-lg hover:shadow-neon-blue transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="glass p-2 rounded-lg hover:shadow-neon-blue transition-all"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            )}
          </motion.div>

          {/* Link Columns */}
          {columns.map((column, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-neon-blue">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-neon-purple transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
