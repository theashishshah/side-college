"use client";

import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Mail } from "lucide-react";
import React from "react";
import messages from "@/messages.json";
// import AutoPlay from 'embla-carousel-autoplay'
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";


const Home = () => {
  return (
    <div>
      <div className="pt-8 flex justify-center pb-4 bg-gray-100 dark:bg-gray-800">
        <div className="">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold px-4 py-2 rounded-lg mb-6 bg-white text-black text-center">
              Meet the dedicated team behind this project
            </h1>
            <div className="space-y-4">
              <div className="flex items-center bg-white p-4 rounded-md shadow">
                <Image
                  src="/ashish.jpg"
                  alt="Ashish Shah"
                  className="w-12 h-12 rounded-full mr-4"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-black">
                    Ashish Shah
                  </span>
                  <span className="italic font-bold text-slate-600">
                    1BI22CS025{" "}
                    <span className="text-sm font-normal ml-2">3rd year</span>
                  </span>
                </div>
                <a
                  href="https://github.com/iamashishshah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-black hover:text-gray-600"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
              <div className="flex items-center bg-white p-4 rounded-md shadow">
                <Image
                  src="/ashishs.jpg"
                  alt="Ayush Raj"
                  className="w-12 h-12 rounded-full mr-4"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-black">
                    Ayush Raj
                  </span>
                  <span className="italic font-bold text-slate-600">
                    1BI22CS026{" "}
                    <span className="text-sm font-normal ml-2">3rd year</span>
                  </span>
                </div>
                <a
                  href="https://github.com/rajayush808"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-black hover:text-gray-600"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
              <div className="flex items-center bg-white p-4 rounded-md shadow">
                <Image
                  src="/ashishs.jpg"
                  alt="Bhavesh"
                  className="w-12 h-12 rounded-full mr-4"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-black">
                    Bhavesh BK
                  </span>
                  <span className="italic font-bold text-slate-600">
                    1BI22CS031{" "}
                    <span className="text-sm font-normal ml-2">3rd year</span>
                  </span>
                </div>
                <a
                  href="https://github.com/bhavesh-bk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-black hover:text-gray-600"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
              <div className="flex items-center bg-white p-4 rounded-md shadow">
                <Image
                  src="/ashishs.jpg"
                  alt="Gaurav Singh"
                  className="w-12 h-12 rounded-full mr-4"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-black">
                    Gaurav Singh
                  </span>
                  <span className="italic font-bold text-slate-600">
                    1BI22CS056{" "}
                    <span className="text-sm font-normal ml-2">3rd year</span>
                  </span>
                </div>
                <a
                  href="https://github.com/gaurav06123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-black hover:text-gray-600"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-[#112D4E] text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Empower Yourself with Genuine, Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - A platform where feedback flows freely, keeping both
            giver and receiver anonymous.
          </p>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <footer className="bg-[#112D4E] text-white py-8">
        <div className="container mx-auto px-4 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">About True Feedback</h2>
              <p className="text-sm text-gray-400">
                True Feedback is a platform where feedback flows freely,
                empowering individuals like teachers, salesmen, creators, and
                business professionals to gather anonymous and genuine feedback.
              </p>
            </div>

            {/* Team Links */}
            <div>
              <h2 className="text-xl font-bold mb-4">Our Team</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/iamashishshah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaGithub className="mr-2" /> Ashish Shah - 1BI22CS025
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/rajayush808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaGithub className="mr-2" /> Ayush Raj - 1BI22CS026
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/bhavesh-bk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaGithub className="mr-2" /> Bhavesh BK - 1BI22CS031
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/gaurav06123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    <FaGithub className="mr-2" /> Gaurav Singh - 1BI22CS056
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} True Feedback. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
