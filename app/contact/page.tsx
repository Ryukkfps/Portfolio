import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import { prisma } from '@/lib/prisma';

export default async function ContactPage() {
  const contactInfo = await prisma.contactInfo.findFirst();

  return (
    <div className="bg-[#111111] min-h-screen pb-24 animate-fadeIn">
      {/* Header Section */}
      <div className="py-24 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#65a30d] text-[10px] font-black tracking-[0.4em] uppercase mb-4">Contact</p>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
            Get In<br/><span className="text-white/20">Touch.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
                Send a message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
                Information
              </h2>
              <ContactInfo variant="card" showTitle={false} />
            </div>
            
            <div className="space-y-8 border-t border-white/5 pt-12">
              <p className="text-[#65a30d] text-[10px] font-black tracking-[0.3em] uppercase">Why Collaborate?</p>
              <div className="space-y-6">
                {[
                  { title: "Technical Expertise", desc: "Deep knowledge in React, .NET, and modern web stack." },
                  { title: "Clean Architecture", desc: "Scalable, maintainable, and optimized code focus." },
                  { title: "Strategic Thinking", desc: "Solving complex business problems through code." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-[#65a30d] font-black">/</span>
                    <div>
                      <p className="text-white font-black text-xs uppercase tracking-widest">{item.title}</p>
                      <p className="text-gray-500 text-xs font-medium mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-8 border-t border-white/5 pt-12">
              {contactInfo?.linkedin && (
                <a 
                  href={contactInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#65a30d] transition-colors border-b-2 border-[#65a30d]/20 hover:border-[#65a30d] pb-1"
                >
                  LinkedIn
                </a>
              )}
              {contactInfo?.github && (
                <a 
                  href={contactInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#65a30d] transition-colors border-b-2 border-[#65a30d]/20 hover:border-[#65a30d] pb-1"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
