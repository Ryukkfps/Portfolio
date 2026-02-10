import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, date, order } = body;
    
    const ach = await prisma.achievement.update({
      where: { id },
      data: {
        title,
        description,
        date,
        order,
      }
    });
    
    return NextResponse.json(ach);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.achievement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
