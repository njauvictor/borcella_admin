"use client"

import { useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // handle your click event here
    // remember to set isLoading back to false when done
  }

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-900 shadow-xl max-lg:hidden">
      <Image src="/Online Duka (2).png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium hover:text-blue-200 active:text-blue-300 ${
              pathname === link.url ? "text-blue-200" : "text-white"
            }`}
            onClick={handleClick}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-white text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>

      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default LeftSideBar;