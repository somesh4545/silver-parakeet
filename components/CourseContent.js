"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function CourseContent({
  activeContent,
  setActiveContent,
  data,
}) {
  const itemClasses = {
    base: "font-bold text-blue-500",
    title: "font-bold",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  console.log(activeContent);
  return (
    <div class="flex flex-grow flex-col" style={{ marginTop: "16px", marginLeft: "8px" }}>
      <div class="p-2 shadow-2xl">
        <h1 class="text-2xl font-semibold ">Course Content</h1>
      </div>
      <div class="flex flex-grow flex-col ">
        <Accordion itemClasses={itemClasses} defaultExpandedKeys={["0"]}>
          {data.sections.map((section, idx) => {
            return (
              <AccordionItem
                key={idx}
                aria-label={`Accordion ${idx}`}
                title={`Section ${idx + 1}: ${section.section}`}
              >
                {section.subsections.map((subsection, ydx) => {
                  return (
                    <h1
                      onClick={() => setActiveContent(subsection._id)}
                      style={{
                        marginTop: "-5px",
                        marginLeft: "10px",
                        marginBottom: "15px",
                        fontSize: "18px",
                        cursor: "pointer",
                        fontWeight: "400",
                        color:
                          subsection._id == activeContent ? "white" : "gray",
                      }}
                      className="line-clamp-1"
                    >
                      {idx + 1}.{ydx + 1}: {subsection.title}{" "}
                    </h1>
                  );
                })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
