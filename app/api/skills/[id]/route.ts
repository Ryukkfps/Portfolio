import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, category, level, icon, order, isActive } = body;
    
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        level: level ? parseInt(level.toString()) : null,
        icon,
        order,
        isActive,
      }
    });
    
    return NextResponse.json({ success: true, result: skill });
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
    
    const result = await prisma.skill.delete({
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
