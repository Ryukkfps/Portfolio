import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(experience);
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
    const { company, role, location, startDate, endDate, description, order } = body;
    
    const exp = await prisma.experience.create({
      data: {
        company,
        role,
        location,
        startDate,
        endDate: endDate || "Present",
        description: description || [],
        order: order || 0
      }
    });
    
    return NextResponse.json({ success: true, id: exp.id, result: exp });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
