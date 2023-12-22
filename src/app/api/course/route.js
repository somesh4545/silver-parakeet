import connectMongodb from "./../../../../libs/db";
import { NextResponse } from "next/server";

import Course from "./../../../../Models/Course";

export async function GET() {
  await connectMongodb();
  const courses = await Course.find();
  return NextResponse.json({ courses: courses });
}

export async function POST(request) {
  await connectMongodb();
  const data = await request.json();

  const course = await Course.create(data);

  return NextResponse.json({ course: course });
}

export async function UPDATE(request) {
  const { id, course_content_id } = await request.json();
  await connectMongodb();

  const course = await Course.findOneAndUpdate(
    { _id: id },
    { $addToSet: { content: course_content_id } }
  );

  return NextResponse.json({ course });
}
