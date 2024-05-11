"use client"

import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import router from 'next/router';

const LeftSideBar = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (url: string) => {
    setIsLoading(true);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200); // vibrate for 200ms
    }
    // handle your click event here
    // remember to set isLoading back to false when done
    router.push(url);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-green1 shadow-xl max-lg:hidden">
      <Image src="/OnlineDuka2.png" alt="logo" width={120} height={80} className='max-lg:hidden'/>
      {navLinks.map((link) => (
        <Link
          href={link.url}
          key={link.label}
          className={`flex gap-4 text-body-medium hover:text-blue-200 active:text-blue-300 transition-colors duration-200 ${
            pathname === link.url ? "text-blue-200" : "text-white"
          }`}
          onClick={() => handleClick(link.url)}
        >
          {link.icon} <p>{link.label}</p>
        </Link>
      ))}
      <div className="flex gap-4 text-white text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default LeftSideBar;