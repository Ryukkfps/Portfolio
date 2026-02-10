import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, date, order } = body;
    
    const ach = await prisma.achievement.create({
      data: {
        title,
        description,
        date,
        order: order || 0
      }
    });
    
    return NextResponse.json(ach);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
