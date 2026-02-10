import Link from 'next/link';
import ContactInfo from './ContactInfo';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-4 space-y-8">
          <Link href="/" className="text-2xl font-black tracking-widest text-white uppercase italic">
            Kartikey<span className="text-[#a3e635]">.</span>
          </Link>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] leading-loose max-w-xs">
            Software Engineer specializing in building scalable web applications and process automation systems.
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/kartikeya-gupta-826923228/" className="text-white hover:text-[#a3e635] transition-colors">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">LinkedIn</span>
            </a>
            <a href="https://github.com/kartikey-gupta" className="text-white hover:text-[#a3e635] transition-colors">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">GitHub</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-8">
          <h3 className="text-white font-black uppercase tracking-[0.3em] text-xs italic">Sitemap</h3>
          <nav className="flex flex-col gap-4">
            <Link href="/" className="text-gray-500 hover:text-[#a3e635] transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Home</Link>
            <Link href="/about" className="text-gray-500 hover:text-[#a3e635] transition-colors text-[10px] font-black uppercase tracking-[0.2em]">About Me</Link>
            <Link href="/services" className="text-gray-500 hover:text-[#a3e635] transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Services</Link>
            <Link href="/projects" className="text-gray-500 hover:text-[#a3e635] transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Projects</Link>
            <Link href="/contact" className="text-gray-500 hover:text-[#a3e635] transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Contact Me</Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-6">
          <ContactInfo variant="footer" showTitle={true} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} Kartikey Gupta. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-gray-600 text-[9px] font-black uppercase tracking-[0.4em]">
          <span className="cursor-default">Engineered with Precision</span>
        </div>
      </div>
    </footer>
  );
}
