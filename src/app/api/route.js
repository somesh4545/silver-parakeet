import connectMongodb from "./../../../libs/db";
import { NextResponse } from "next/server";

import Content from "./../../../Models/Content";

export async function GET() {
  await connectMongodb();
  const content = await Content.find();
  return NextResponse.json({ data: "backend working" });
}
