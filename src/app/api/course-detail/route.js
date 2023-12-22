import connectMongodb from "./../../../../libs/db";
import { NextResponse } from "next/server";

import CourseContent from "./../../../../Models/CourseContent";
import Course from "../../../../Models/Course";
import Content from "../../../../Models/Content";

export async function GET(req) {
  await connectMongodb();
  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get("course_id");

  const course = await Course.findOne({ _id: course_id }).populate({
    path: "content",
    model: "Content",
  });

  const sections = [];
  course.content.forEach((content) => {
    if (!content.parent) {
      // For top-level sections
      sections.push({
        _id: content._id,
        section: content.title,
        totalVideos: content.children.length,
        subsections: [],
      });
    } else {
      // For content with a parent
      const parentSection = sections.find(
        (section) => section._id.toString() === content.parent.toString()
      );

      if (parentSection) {
        parentSection.subsections.push(content);
      }
    }
  });
  return NextResponse.json({ sections: sections });
}
