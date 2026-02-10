import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(education);
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
    const { institution, degree, year, location, order } = body;
    
    const edu = await prisma.education.create({
      data: {
        institution,
        degree,
        year,
        location,
        order: order || 0
      }
    });
    
    return NextResponse.json({ success: true, id: edu.id, result: edu });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
