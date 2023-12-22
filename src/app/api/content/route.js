import connectMongodb from "./../../../../libs/db";
import { NextResponse } from "next/server";

import Content from "./../../../../Models/Content";

export async function GET() {
  await connectMongodb();
  const content = await Content.find();
  return NextResponse.json({ data: content });
}

export async function POST(request) {
  await connectMongodb();
  const data = await request.json();

  if (!data.parent) {
    const content = await Content.create(data);
    return NextResponse.json({ content });
  } else {
    const content = await Content.create(data);
    const parentContent = await Content.findOneAndUpdate(
      { _id: data.parent },
      { $addToSet: { children: content._id } }, // Adding child_id to the children array
      { new: true } // Return the modified document
    );
    return NextResponse.json({ content });
  }
}

export async function UPDATE(request) {
  await connectMongodb();
  const { parent_id, child_id } = await request.json();

  const parentContent = await Content.findOneAndUpdate(
    { _id: parent_id },
    { $addToSet: { children: child_id } }, // Adding child_id to the children array
    { new: true } // Return the modified document
  );

  const childContent = await Content.findOneAndUpdate(
    { _id: child_id },
    { parent: parent_id },
    { new: true }
  );

  return NextResponse.json({ parentContent, childContent });
}
