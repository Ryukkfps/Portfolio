import "dotenv/config";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ["error"],
});

async function main() {
  // Clear existing data
  try {
    await prisma.user.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.experience.deleteMany({});
    await prisma.skill.deleteMany({});
    await prisma.education.deleteMany({});
    await prisma.achievement.deleteMany({});
    await prisma.contactInfo.deleteMany({});
    await prisma.enquiry.deleteMany({});
    await prisma.carouselSlide.deleteMany({});
    await prisma.service.deleteMany({});
  } catch (e) {
    console.log("Cleanup failed (likely because collections don't exist yet), continuing...");
  }

  // Create admin user
  await prisma.user.create({
    data: {
      name: "Kartikey Gupta",
      email: "kartikey.kg.888@gmail.com",
      password: "adminpassword123", 
      role: "ADMIN",
    },
  });

  // Create Projects
  const projects = [
    {
      title: "Employee Management System",
      description: "A comprehensive HR solution capable of handling real-world workflows, payroll calculations, and automated reporting.",
      features: [
        "Requirement gathering to implementation",
        "Database schema design and query optimization",
        "Backend migration to .NET 8",
        "Clean, scalable API architecture",
        "Reusable React components with Vite",
        "Export & notification automation"
      ],
      techStack: ["React (Vite)", ".NET 8 Web API", "MySQL"],
      order: 1,
    },
    {
      title: "Score Processing Application",
      description: "Automates examination result generation with rule-based evaluation and OMR support.",
      features: [
        "Fast, interactive data handling and review workflows",
        "Processing large volumes of candidate data",
        "Automated collation with answer keys",
        "Rule-based evaluation engine",
        "OMR data processing support",
        "Manual correction workflows"
      ],
      techStack: ["React (Vite)", ".NET 8 Web API", "SQL Server"],
      order: 2,
    },
    {
      title: "Key Generator Application",
      description: "Automates answer-key variant generation for examinations with intelligent validation logic.",
      features: [
        "Pattern configuration and validation",
        "Processing and generating multiple variants",
        "User-defined pattern configuration system",
        "Intelligent validation logic",
        "Discrepancy detection"
      ],
      techStack: ["React (Vite)", ".NET 8 Web API", "SQL Server"],
      order: 3,
    }
  ];

  for (const data of projects) {
    await prisma.project.create({ data });
  }

  // Create Experience
  const experiences = [
    {
      company: "Chandrakala Universal Pvt. Ltd.",
      role: "Full Stack Developer",
      location: "Prayagraj, Uttar Pradesh",
      startDate: "August, 2023",
      endDate: "Present",
      description: [
        "Owned the end-to-end development of Employee Management System.",
        "Developed web-based Score Processing Application to automate examination results.",
        "Developed KeyGen to automate answer-key variant generation.",
        "Led a team of 10 developers overseeing end-to-end project lifecycle.",
        "Mentored 5+ trainee full-stack developers."
      ],
      order: 1,
    }
  ];

  for (const data of experiences) {
    await prisma.experience.create({ data });
  }

  // Create Skills
  const skills = [
    { name: "React", category: "Frontend", level: 90, order: 1 },
    { name: "React-Native", category: "Mobile", level: 80, order: 2 },
    { name: "Next.js", category: "Frontend", level: 85, order: 3 },
    { name: "JavaScript", category: "Languages", level: 95, order: 4 },
    { name: "C#", category: "Languages", level: 90, order: 5 },
    { name: "DotNet", category: "Backend", level: 90, order: 6 },
    { name: "Node.js", category: "Backend", level: 85, order: 7 },
    { name: "Express.js", category: "Backend", level: 85, order: 8 },
    { name: "MySQL", category: "Database", level: 85, order: 9 },
    { name: "MongoDB", category: "Database", level: 80, order: 10 },
    { name: "Tailwind CSS", category: "Design", level: 90, order: 11 },
    { name: "Vite", category: "Tools", level: 90, order: 12 },
  ];

  for (const data of skills) {
    await prisma.skill.create({ data });
  }

  // Create Services
  const services = [
    {
      title: "Full Stack Development",
      description: "Building robust, scalable web applications from scratch using modern frameworks and clean architecture.",
      icon: "💻",
      order: 1,
    },
    {
      title: "Frontend Engineering",
      description: "Crafting highly interactive and responsive user interfaces with React, Next.js, and advanced CSS techniques.",
      icon: "🎨",
      order: 2,
    },
    {
      title: "Backend & APIs",
      description: "Designing efficient database schemas and developing high-performance RESTful APIs with Node.js and .NET.",
      icon: "⚙️",
      order: 3,
    },
    {
      title: "Process Automation",
      description: "Streamlining business workflows and reducing manual effort through custom automation tools.",
      icon: "🚀",
      order: 4,
    }
  ];

  for (const data of services) {
    await prisma.service.create({ data });
  }

  // Create Education
  await prisma.education.create({
    data: {
      institution: "UNIVERSITY OF ALLAHABAD",
      degree: "Bachelor's Degree",
      year: "2021",
      location: "Prayagraj, India",
    }
  });

  // Create Achievements
  const achievements = [
    {
      title: "Delivered 8 full-stack web applications",
      description: "Successfully developed and delivered across different business domains.",
      order: 1,
    },
    {
      title: "Led a team of 10 developers",
      description: "Overseeing end-to-end project lifecycle, task delegation, and quality assurance.",
      order: 2,
    },
    {
      title: "Productified 3 applications",
      description: "Transitioned from internal builds to market-ready products.",
      order: 3,
    }
  ];

  for (const data of achievements) {
    await prisma.achievement.create({ data });
  }

  // Create Contact Info
  await prisma.contactInfo.create({
    data: {
      address: "Prayagraj, Uttar Pradesh, India",
      phone: "+91 7459076207",
      email: "kartikey.kg.888@gmail.com",
      linkedin: "https://www.linkedin.com/in/kartikeya-gupta-826923228/",
      github: "https://github.com/kartikey-gupta",
      workingHours: "Open to Full-time Opportunities and Freelance Projects",
    }
  });

  // Create Carousel Slide for home page
  await prisma.carouselSlide.create({
    data: {
      title: "Kartikey Gupta",
      subtitle: "Full Stack Developer",
      description: "Over 3 years of experience building and maintaining scalable web applications.",
      image: "/hero-dev.jpg",
      ctaText: "View My Work",
      ctaLink: "/projects",
      order: 1,
    }
  });

  console.log('Portfolio database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
