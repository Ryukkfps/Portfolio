'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
}

export default function Hero({ initialSlides }: { initialSlides: Slide[] }) {
  const slide = initialSlides[0] || {
    title: "Full Stack Dev.",
    subtitle: "Hi, I am Kartikey",
    description: "I build scalable web applications with React & .NET",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    ctaText: "Know More"
  };

  return (
    <section className="relative h-[90vh] w-full bg-[#111111] overflow-hidden flex items-center px-8 md:px-20">
      {/* Background Image - Styled like the reference */}
      <div className="absolute right-0 top-0 h-full w-full md:w-1/2 z-0 opacity-60 md:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/40 to-transparent z-10" />
        <Image
          src={slide.image}
          alt={slide.subtitle}
          fill
          className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-2xl animate-fadeInUp">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          {slide.subtitle} <span className="text-[#a3e635]">{slide.title}</span>
        </h2>
        
        <div className="mb-10 overflow-hidden border-l-4 border-[#a3e635] pl-6 py-2">
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            {slide.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <Link 
            href="/projects" 
            className="px-8 py-4 border border-gray-700 text-gray-300 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:border-white transition-all"
          >
            Show Profile
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-[#a3e635] text-black text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#bef264] transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)]"
          >
            {slide.ctaText}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
        <ChevronDown className="text-white opacity-30 hover:opacity-100 transition-opacity w-8 h-8" />
      </div>
    </section>
  );
}
