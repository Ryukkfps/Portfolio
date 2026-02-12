import Hero from "@/components/Hero";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { prisma } from "@/lib/prisma";
import { Code, Server, Database, Globe, Cpu, Smartphone } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const slides = await prisma.carouselSlide.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  const skills = await prisma.skill.findMany({
    where: { isActive: true },
    take: 6,
    orderBy: { order: 'asc' }
  });

  const projects = await prisma.project.findMany({
    where: { isActive: true },
    take: 4,
    orderBy: { order: 'asc' }
  });

  const achievements = await prisma.achievement.findMany({
    take: 3,
    orderBy: { order: 'asc' }
  });

  const bio = await prisma.bio.findFirst();

  const iconMap: Record<string, any> = {
    code: Code,
    server: Server,
    database: Database,
    globe: Globe,
    cpu: Cpu,
    mobile: Smartphone,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#111111]">
      <Hero initialSlides={slides} />
      
      <main className="grow">
        {/* Our Services Section - Styled like the image */}
        <section className="py-32 px-8 bg-[#151515]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight uppercase">Our Services</h2>
              <div className="w-20 h-1 bg-[#65a30d] mx-auto mb-6"></div>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">What I offer to my clients</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.slice(0, 3).map((skill) => {
                const Icon = iconMap[skill.icon || 'code'] || Code;
                return (
                  <div key={skill.id} className="bg-[#1a1a1a] p-12 border border-white/5 hover:border-[#65a30d]/30 transition-all group text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#111111] mb-8 border border-white/10 group-hover:bg-[#65a30d] transition-all">
                      <Icon className="w-8 h-8 text-[#65a30d] group-hover:text-black transition-all" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{skill.name}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      Professional {skill.category} solutions optimized for performance and scalability.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* My Portfolio Section - Styled like the image */}
        <section className="py-32 px-8 bg-[#111111]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight uppercase">My Portfolio</h2>
              <div className="w-20 h-1 bg-[#65a30d] mx-auto mb-6"></div>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">Some of my recent work</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects`} className="relative aspect-square overflow-hidden group">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all z-10" />
                  <img 
                    src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000"} 
                    alt={project.title}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all">
                    <h4 className="text-white font-bold uppercase tracking-widest text-center">{project.title}</h4>
                    <span className="text-[#65a30d] text-[10px] font-black tracking-widest mt-2 uppercase">{project.techStack[0]}</span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link 
                href="/projects" 
                className="inline-block px-10 py-4 border-2 border-white/10 text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Our Team / Achievements Section */}
        <section className="py-32 px-8 bg-[#151515]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight uppercase">Key Achievements</h2>
              <div className="w-20 h-1 bg-[#65a30d] mx-auto mb-6"></div>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">What I have accomplished</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {achievements.map((ach, index) => (
                <div key={ach.id} className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${index % 2 === 0 ? 'from-[#65a30d] to-[#bef264]' : 'from-[#3b82f6] to-[#06b6d4]'} opacity-20 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200`}></div>
                  <div className="relative bg-[#1a1a1a] p-8 h-full border border-white/5">
                    <h3 className="text-2xl font-bold text-white mb-4">{ach.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Themed Footer */}
        <section className="py-32 px-8 bg-[#65a30d]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-20 h-20 bg-black rounded-full mx-auto mb-8 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src={bio?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"} 
                  alt={bio?.name || "Kartikey"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-4xl font-black text-black uppercase tracking-tighter mb-4 italic">Let's build your next project!</h2>
              <p className="text-black/70 font-bold uppercase tracking-widest text-sm">Open for full-time and freelance opportunities</p>
            </div>
            
            <div className="bg-black p-12 border border-black/10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
