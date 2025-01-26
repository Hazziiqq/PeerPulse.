import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between py-4 bg-lavender mt-2 rounded-r-md w-[1000px]">
        {/* Left and Center Section: Logo and Navigation */}
        <div className="flex items-center flex-1">
          <div className="font-raleway text-2xl text-white pl-4hover:">
          <Link href="/" className="hover:pointer">PeerPulse</Link>
            </div>
          <nav className="flex-1">
            <ul className="flex justify-center items-center text-white gap-4">
              <li>
                <Link href="/diary" className="hover:pointer">
                  Diary
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:pointer">
                  Chat
                </Link>
              </li>
              <li>
                <Link href="/exercise" className="hover:pointer">
                  Exercise
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section: Sign In and Login */}
        <div className="flex items-center gap-4 pr-4">
          <button className="py-1 px-4 border border-solid text-white bg-lavender hover:bg-white hover:text-lavender rounded-md">Sign In</button>
          <button className="py-1 px-4 border border-solid text-white bg-lavender hover:bg-white hover:text-lavender rounded-md">Login</button>
        </div>
      </header>
    </>
  );
};

export default Header;


 // <div className="flex items-center justify-between py-4 bg-lavender mt-2 rounded-r-full w-[1000px]">
    //   {/* Left Section: Logo */}
    //   <div className="font-raleway text-2xl text-white pl-4">
    //     PeerPulse
    //   </div>

    //   {/* Center Section: Navigation */}
    //   <nav className="flex-1">
        
    //   </nav>

    //   {/* Right Section: Sign In and Login */}
      
