"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link'

import VideoRenderer from "../../components/VideoRenderer";
import VideoInformation from "../../components/VideoInformation";
import CourseContent from "../../components/CourseContent";

export default function Home() {
  const [processing, setprocessing] = useState(true);
  const [courses, setCourses] = useState();

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    await fetch("/api/course" )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCourses(data.courses);
        setprocessing(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <main className=" min-h-screen bg-zinc-950 flex flex-col">
      <nav class="bg-gray-900">
        <div class="min-w-full flex flex-wrap items-center justify-between mx-auto p-4 px-8">
          <a class="flex items-center space-x-3 rtl:space-x-reverse" href="/">
            <Image
              src="/hakirat.jpg"
              class=" rounded-full"
              alt="Flowbite Logo"
              width={50}
              height={50}
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              100xdevs
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http:/ewww.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              ></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <div class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {processing == true ? (<div className="flex justify-center items-center">
        <h1 className="text-white font-bold text-2xl">Loading ...</h1>
      </div>) : (
        <div className="min-h-full flex-grow flex flex-col p-8 pt-16">
         <h1 className="text-2xl font-bold mb-5">Courses</h1>

         {courses.map((course, idx) => 
         {
          return(<div className="m-4" key={idx}>
          <Link href={`/course/${course._id}`}>  <Image className="rounded-md" src={course.imageUrl} width={300} height={200} />
            <h1 className="font-bold text-2xl">{course.title}</h1></Link>
          </div>)
         })}
        </div>
      )}
    </main>
  );
}
