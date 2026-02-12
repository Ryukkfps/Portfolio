import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-[#111111] sticky top-0 z-50 transition-all duration-300">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold tracking-widest text-white uppercase">Kartikey<span className="text-[#65a30d]">.</span></span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Link href="/" className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-[#65a30d] transition-colors uppercase">
          Home
        </Link>
        <Link href="/about" className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-[#65a30d] transition-colors uppercase">
          About Me
        </Link>
        <Link href="/services" className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-[#65a30d] transition-colors uppercase">
          Services
        </Link>
        <Link href="/projects" className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-[#65a30d] transition-colors uppercase">
          Projects
        </Link>
        <Link href="/contact" className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-[#65a30d] transition-colors uppercase">
          Contact Me
        </Link>
      </nav>

      <Link 
        href="/contact" 
        className="border-2 border-[#65a30d] text-[#65a30d] px-6 py-2 text-[10px] font-black tracking-[0.3em] hover:bg-[#65a30d] hover:text-black transition-all uppercase"
      >
        Hire Me
      </Link>
    </header>
  );
}
