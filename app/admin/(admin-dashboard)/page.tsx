import Link from "next/link";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const dashboardCards = [
    { title: "Bio", description: "Manage About Me Content", icon: "👤", href: "/admin/bio", subtitle: "Professional Summary" },
    { title: "Wins", description: "Manage Key Achievements", icon: "🏆", href: "/admin/achievements", subtitle: "Milestones" },
    { title: "Projects", description: "Manage Portfolio Projects", icon: "💼", href: "/admin/projects", subtitle: "Project Portfolio" },
    { title: "Experience", description: "Manage Work History", icon: "📄", href: "/admin/experience", subtitle: "Career Timeline" },
    { title: "Skills", description: "Manage Technical Skills", icon: "⭐", href: "/admin/skills", subtitle: "Tech Stack" },
    { title: "Education", description: "Manage Academic History", icon: "🎓", href: "/admin/education", subtitle: "Qualifications" },
    { title: "Carousel", description: "Manage Homepage Slides", icon: "🎠", href: "/admin/carousel", subtitle: "Visual Hero" },
    { title: "Enquiries", description: "View Client Messages", icon: "📧", href: "/admin/enquiries", subtitle: "Contact Forms" },
    { title: "Contact Info", description: "Manage Socials & Details", icon: "📞", href: "/admin/contact-info", subtitle: "Personal Info" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-serif text-[#004d66] uppercase tracking-widest">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Kartikey Gupta Portfolio Management
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card) => (
              <Link key={card.title} href={card.href} className="block">
                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="p-5 flex-grow">
                    <div className="flex items-center">
                      <div className="shrink-0">
                        <div className="w-10 h-10 bg-[#004d66] rounded-full flex items-center justify-center">
                          <span className="text-white text-lg">{card.icon}</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.title}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {card.subtitle}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 mt-auto">
                    <div className="text-sm">
                      <span className="font-medium text-[#004d66] hover:text-[#003d52]">
                        {card.description} →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
