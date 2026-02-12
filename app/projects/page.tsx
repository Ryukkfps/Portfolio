export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  return (
    <div className="bg-[#111111] min-h-screen pb-24 animate-fadeIn">
      {/* Header Section */}
      <div className="py-24 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#65a30d] text-[10px] font-black tracking-[0.4em] uppercase mb-4">Case Studies</p>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
            Selected<br/><span className="text-white/20">Works.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-24">
        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, index) => (
            <div key={project.id} className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Project Info */}
              <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                <div className="flex items-center gap-4">
                  <span className="text-[#65a30d] font-black text-4xl italic tracking-tighter opacity-20">0{index + 1}</span>
                  <div className="h-[2px] w-12 bg-[#65a30d]/30"></div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter italic group-hover:text-[#65a30d] transition-colors leading-none">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-gray-500 font-bold text-[9px] tracking-[0.2em] uppercase border border-white/10 px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-400 font-medium leading-relaxed text-lg">
                  {project.description}
                </p>

                <div className="flex gap-8">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-white font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#65a30d] transition-colors border-b-2 border-[#65a30d]/20 hover:border-[#65a30d] pb-1">Codebase</a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="text-white font-black text-[10px] uppercase tracking-[0.3em] hover:text-[#65a30d] transition-colors border-b-2 border-[#65a30d]/20 hover:border-[#65a30d] pb-1">View Project</a>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:col-span-7 space-y-12">
                <div className="bg-white/5 aspect-video overflow-hidden border border-white/5">
                  <img 
                    src={project.image || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200`} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 bg-white/[0.02] border border-white/5">
                  <div className="space-y-4">
                    <p className="text-[#65a30d] text-[10px] font-black tracking-[0.3em] uppercase">Core Features</p>
                    <ul className="space-y-3">
                      {project.features.slice(0, 4).map((item, i) => (
                        <li key={i} className="text-gray-500 text-xs font-bold leading-relaxed flex items-start">
                          <span className="text-[#65a30d] mr-3 font-black">/</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[#65a30d] text-[10px] font-black tracking-[0.3em] uppercase">Impact</p>
                    <p className="text-gray-500 text-xs font-bold leading-relaxed italic">
                      Automated manual workflows and established a scalable foundation for business growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-48 text-center border-t border-white/5 pt-24">
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs mb-8">Looking for a custom solution?</p>
          <Link
            href="/contact"
            className="inline-block bg-[#65a30d] text-black px-12 py-5 text-[10px] font-black tracking-[0.4em] hover:bg-white transition-all transform hover:scale-105"
          >
            GET IN TOUCH
          </Link>
        </div>
      </div>
    </div>
  );
}
