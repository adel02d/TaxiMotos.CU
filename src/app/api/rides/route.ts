import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const rides = await prisma.ride.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    return NextResponse.json(rides);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ride = await prisma.ride.update({
      where: { id: parseInt(body.rideId) },
      data: { status: body.status },
    });
    return NextResponse.json(ride);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
