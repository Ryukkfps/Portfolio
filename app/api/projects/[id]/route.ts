import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, features, techStack, image, githubUrl, demoUrl, order, isActive } = body;
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        features,
        techStack,
        image,
        githubUrl,
        demoUrl,
        order,
        isActive,
      }
    });
    
    return NextResponse.json({ success: true, result: project });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await prisma.project.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
