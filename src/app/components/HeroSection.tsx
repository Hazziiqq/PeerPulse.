
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = () => {
  const quotes = [
    "Take a deep breath, close your eyes, and let the world fade away. In this moment, you are enough—whole and at peace.",
    "Breathe in calm, breathe out stress. You’re exactly where you need to be, and everything will fall into place.",
    "In the stillness of this moment, let your mind rest. Feel the gentle rhythm of your breath and embrace the quiet.",
    "Let go of the noise around you. With each breath, find serenity within and allow yourself to simply be.",
  ];

  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setImgIndex((prev: number) => (prev+1)% images.length)
    },4000);
    return () => clearInterval(imgInterval)
  },[images.length])

  return (
    <div className=" bg-cheer h-[500px] w-[1300px] grid gap-4 m-4 grid-cols-12 shadow-xl rounded-lg">
      {/* Left Section: Quotes */}
      <div className=" mt-10 col-span-12 md:col-span-6 flex flex-col justify-center items-center min-h-[400px] text-center rounded-xl">
        <p className="text-xl font-medium text-gray-700">{quotes[quoteIndex]}</p>
        <p className="mt-10 text-3xl text-lavender font-semibold">WELCOME TO PEERPULSE</p>
        <p className="mt-2 text-lg text-gray-600">YOUR THERAPY PARTNER</p>
      </div>

      {/* Right Section: Placeholder for images or cards */}
      <div className="mt-3 col-span-12 md:col-span-6 flex justify-center items-center rounded-md min-h-[100px]">
        <Image 
          src={images[imgIndex]} 
          alt={`Image ${imgIndex + 1}`} 
          width={300} 
          height={300} 
          className="rounded-md" 
        />
      </div>
    </div>
  );
};

export default HeroSection;
