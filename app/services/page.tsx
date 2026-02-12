export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';


export default async function ServicesPage() {
  const [skills, services] = await Promise.all([
    prisma.skill.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
  ]);

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="bg-[#111111] min-h-screen pb-24 animate-fadeIn">
      {/* Header Section */}
      <div className="py-24 px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#65a30d] text-[10px] font-black tracking-[0.4em] uppercase mb-4">Capability</p>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
            Expertise<br/><span className="text-white/20">& Services.</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-24 space-y-32">
        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-1px bg-white/10 border border-white/10">
          {services.map((service, index) => (
            <div key={index} className="bg-[#111111] p-12 hover:bg-[#65a30d]/5 transition-all group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">
                {service.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="space-y-16">
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Technical Stack</h2>
            <div className="h-[2px] flex-grow mx-8 mb-4 bg-white/5"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {categories.map((category) => (
              <div key={category} className="space-y-8">
                <h3 className="text-[#65a30d] text-[10px] font-black tracking-[0.4em] uppercase border-b border-white/10 pb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.filter(s => s.category === category).map((skill) => (
                    <div 
                      key={skill.id} 
                      className="px-4 py-2 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:border-[#65a30d] hover:text-[#65a30d] transition-all cursor-default"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#65a30d] p-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter italic mb-8">
            Let's build something<br/>extraordinary.
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-black text-[#65a30d] px-12 py-5 text-[10px] font-black tracking-[0.4em] hover:bg-white hover:text-black transition-all"
          >
            START A CONVERSATION
          </Link>
        </div>
      </div>
    </div>
  );
}
