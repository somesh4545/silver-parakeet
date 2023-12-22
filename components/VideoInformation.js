"use client";
import React, { useEffect, useState } from "react";

export default function VideoInformation({ data, activeContent }) {
  const [content, setcontent] = useState();
  const [tab, settab] = useState("overview");
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    fetchNewContent();
  }, [activeContent]);

  const fetchNewContent = async () => {
    setProcessing(true);
    data.sections.map((section) => {
      section.subsections.map((content) => {
        if (content._id == activeContent) {
          setcontent(content);
          setProcessing(false);
        }
      });
    });
  };

  function secondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  if (processing) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-row ">
        <div
          onClick={() => settab("overview")}
          className={` py-1 px-3  ${
            tab == "overview" ? "bg-zinc-600 rounded-lg" : "bg-transparent"
          } `}
        >
          <h1 className="text-2xl font-bold">Overview</h1>
        </div>
        <div
          onClick={() => settab("summary")}
          className={` py-1 px-3 ${
            tab == "summary" ? "bg-zinc-600 rounded-lg" : "bg-transparent"
          } `}
        >
          <h1 className="text-2xl font-bold">Summary</h1>
        </div>
      </div>

      {tab == "overview" ? (
        <div className="mt-8">
          <h1 className="font-bold text-2xl">{content.title}</h1>
          <h6 className="font-normal text-lg text-gray-500 mt-2">
            {content.description}
          </h6>
          <h6 className="mt-3 text-lg">Chapters</h6>
          <div>
            {content.chapters.map((chapter, i) => {
              return (
                <p className="text-lg cursor-pointer">
                  {chapter.chapterName}{" "}
                  <span className="text-blue-600">
                    {secondsToHMS(chapter.seconds)}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h1 className="text-lg">{content.summary}</h1>
        </div>
      )}
    </div>
  );
}
