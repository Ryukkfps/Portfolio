'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#65a30d] p-12 text-center">
        <div className="text-black text-6xl mb-6 font-black">✓</div>
        <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter italic">Message Sent!</h3>
        <p className="text-black/70 font-bold uppercase tracking-widest text-sm">
          I will get back to you as soon as possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-10 px-8 py-3 bg-black text-[#65a30d] text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 text-[10px] font-bold uppercase tracking-widest">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:outline-none focus:border-[#65a30d] text-white placeholder-gray-600 text-xs font-bold uppercase tracking-widest transition-all"
          placeholder="Your Name *"
        />
        
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:outline-none focus:border-[#65a30d] text-white placeholder-gray-600 text-xs font-bold uppercase tracking-widest transition-all"
          placeholder="Your Email *"
        />
      </div>
      
      <input
        type="text"
        id="subject"
        required
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:outline-none focus:border-[#65a30d] text-white placeholder-gray-600 text-xs font-bold uppercase tracking-widest transition-all"
        placeholder="Subject *"
      />
      
      <textarea
        id="message"
        required
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:outline-none focus:border-[#65a30d] text-white placeholder-gray-600 text-xs font-bold uppercase tracking-widest transition-all resize-none"
        placeholder="Your Message *"
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#65a30d] text-black py-5 px-8 text-[10px] font-black tracking-[0.4em] uppercase hover:bg-white transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Submit Message'}
      </button>
    </form>
  );
}