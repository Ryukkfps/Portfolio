import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(services);
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
    const { title, description, icon, order, isActive } = body;
    
    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });
    
    return NextResponse.json({ success: true, id: service.id, result: service });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
