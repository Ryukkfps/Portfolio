export const dynamic = "force-dynamic";
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AboutPage() {
  const bio = await prisma.bio.findFirst();

  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' }
  });

  const education = await prisma.education.findMany({
    orderBy: { order: 'asc' }
  });

  const achievements = await prisma.achievement.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="bg-[#111111] min-h-screen pb-24 animate-fadeIn">
      {/* Header Section */}
      <div className="py-24 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#65a30d] text-[10px] font-black tracking-[0.4em] uppercase mb-4">Discovery</p>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
            About<br/><span className="text-white/20">Me.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-24 space-y-32">
        {/* Professional Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#65a30d]/20 group-hover:bg-[#65a30d]/30 transition-all duration-500 blur-2xl"></div>
            <div className="relative aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden">
              <img
                src={bio?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"}
                alt={bio?.name || "Kartikey Gupta"}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{bio?.title || "Software Engineer"}</h2>
            <div className="space-y-6">
              {bio?.description.map((para, i) => (
                <p key={i} className="text-gray-400 leading-relaxed text-xl font-medium">
                  {para}
                </p>
              )) || (
                <p className="text-gray-400 leading-relaxed text-xl font-medium">
                  Full Stack Developer with over 3 years of experience building and maintaining scalable web applications. 
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-[#65a30d] text-[10px] font-black tracking-[0.2em] uppercase mb-2">Location</p>
                <p className="text-white font-bold uppercase tracking-widest text-sm">{bio?.location || "Prayagraj, UP"}</p>
              </div>
              <div>
                <p className="text-[#65a30d] text-[10px] font-black tracking-[0.2em] uppercase mb-2">Experience</p>
                <p className="text-white font-bold uppercase tracking-widest text-sm">{bio?.experienceYears || "3+ Years"}</p>
              </div>
            </div>
            {bio?.resumeUrl && (
              <div className="pt-8">
                <a 
                  href={bio.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 border border-[#65a30d] text-[#65a30d] text-[10px] font-black tracking-[0.3em] uppercase hover:bg-[#65a30d] hover:text-black transition-all"
                >
                  Download CV
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-16">
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Experience</h2>
            <div className="h-[2px] flex-grow mx-8 mb-4 bg-white/5"></div>
          </div>
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="group relative grid grid-cols-1 md:grid-cols-[200px,1fr] gap-8 p-8 border border-white/5 hover:bg-white/5 transition-all">
                <div className="text-gray-500 font-black text-xs uppercase tracking-[0.3em]">
                  {exp.startDate} - {exp.endDate}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic group-hover:text-[#65a30d] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">
                      {exp.company} | {exp.location}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-500 text-sm font-medium leading-relaxed flex items-start">
                        <span className="text-[#65a30d] mr-3 font-black">/</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <section className="space-y-12">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Education</h2>
            <div className="space-y-12">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-2 border-l-2 border-[#65a30d] pl-6">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">{edu.degree}</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{edu.institution}</p>
                  <p className="text-gray-600 font-black text-[10px] uppercase tracking-[0.2em]">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Wins</h2>
            <div className="space-y-8">
              {achievements.map((ach) => (
                <div key={ach.id} className="p-6 bg-white/5 border border-white/5 hover:border-[#65a30d]/30 transition-all">
                  <h3 className="text-[#65a30d] font-black uppercase tracking-widest text-sm mb-2">{ach.title}</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="text-center pt-24">
          <Link
            href="/contact"
            className="inline-block bg-[#65a30d] text-black px-12 py-5 text-[10px] font-black tracking-[0.4em] hover:bg-white transition-all transform hover:scale-105"
          >
            START A PROJECT
          </Link>
        </div>
      </div>
    </div>
  );
}
