import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, features, techStack, image, githubUrl, demoUrl, order, isActive } = body;
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        features: features || [],
        techStack: techStack || [],
        image,
        githubUrl,
        demoUrl,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });
    
    return NextResponse.json({ success: true, id: project.id, result: project });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
