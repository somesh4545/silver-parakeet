import connectMongodb from "./../../../../libs/db";
import { NextResponse } from "next/server";

import CourseContent from "./../../../../Models/CourseContent";
import Course from "../../../../Models/Course";

// export async function GET() {
//   await connectMongodb();
//   const courses = await Course.find();
//   return NextResponse.json({ courses: courses });
// }

export async function POST(request) {
  await connectMongodb();
  const data = await request.json();

  const course_content = await CourseContent.create({
    course: data.course,
    content: data.content,
  });

  const course = await Course.findOneAndUpdate(
    { _id: data.course },
    { $addToSet: { content: data.content } },
    { new: true }
  );

  return NextResponse.json({ course });
}
