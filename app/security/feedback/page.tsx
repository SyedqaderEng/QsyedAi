'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Star } from 'lucide-react';

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Feedback</h1>
          </div>
          <p className="text-gray-400">Help us improve Syed.AI</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-8">
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-3">How would you rate your experience?</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="p-2 hover:scale-110 transition-transform">
                  <Star className={`w-8 h-8 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Your feedback</label>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={5} placeholder="Tell us what you think..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 resize-none" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold"><Send className="w-4 h-4" />Submit Feedback</button>
        </motion.div>
      </div>
    </div>
  );
}
