"use client";

import React, { useState, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import $ from "jquery";

export default function VideoRenderer({ data, activeContent }) {
  const [content, setcontent] = useState();
  const [processing, setProcessing] = useState(true);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = videojs(videoRef.current, {
        sources: [
          {
            // for the time being using the local video bcoz not getting the solution for using drive right now
            src: "http://localhost:3000/docker.mp4",
            // src: "https://drive.google.com/uc?export=download&id=1P8WG-OpUzFt_mVmFSae2mZiGe1jC42iW",
            // src: "https://drive.google.com/file/d/1P8WG-OpUzFt_mVmFSae2mZiGe1jC42iW/view",
            type: "video/mp4",
          },
        ],
      });

      var chapters = content.chapters;
      player.on("loadedmetadata", function () {
        var total = player.duration();

        console.log(chapters);

        // accessing the progress control to add the chapter marker
        var p = $(player.controlBar.progressControl.children_[0].el_);

        for (var i = 0; i < chapters.length; i++) {
          (function (chapter) {
            var left = (chapter.seconds / total) * 100 + "%";
            var time = chapter.seconds;

            var el = $(
              '<div class="vjs-marker" style="left:' +
                left +
                '" data-time="' +
                time +
                '"><span>' +
                chapter.chapterName +
                "</span></div>"
            );

            p.append(el);
          })(chapters[i]);
        }
      });
    }
  });

  useEffect(() => {
    fetchNewContent();
  }, [activeContent]);

  const fetchNewContent = async () => {
    data.sections.map((section) => {
      section.subsections.map((content) => {
        if (content._id == activeContent) {
          setcontent(content);
          setProcessing(false);
        }
      });
    });
  };

  if (processing) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <video
        controls
        ref={videoRef}
        style={{ widht: "100" }}
        className="video-js"
      />
    </div>
  );
}
