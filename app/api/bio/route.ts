import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Use a fresh client for bio to ensure new models are recognized
const prisma = new PrismaClient();

export async function GET() {
  try {
    const bio = await prisma.bio.findFirst();
    return NextResponse.json(bio);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, description, image, location, experienceYears, resumeUrl } = body;
    
    const bio = await prisma.bio.create({
      data: {
        name,
        title,
        description: description || [],
        image,
        location,
        experienceYears,
        resumeUrl
      }
    });
    
    return NextResponse.json(bio);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, title, description, image, location, experienceYears, resumeUrl } = body;
    
    const bio = await prisma.bio.update({
      where: { id },
      data: {
        name,
        title,
        description: description || [],
        image,
        location,
        experienceYears,
        resumeUrl
      }
    });
    
    return NextResponse.json(bio);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
