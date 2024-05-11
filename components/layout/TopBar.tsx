"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { navLinks } from "@/lib/constants";
import router from "next/router";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();

  const handleMenuClick = () => {
    setDropdownMenu(!dropdownMenu);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200); // vibrate for 200ms
    }
  };

  const handleLinkClick = (url: string) => {
    router.push(url);
    setDropdownMenu(false);
  };

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-green1 shadow-xl lg:hidden">
      <Image src="/OnlineDuka2.png" alt="logo" width={150} height={70} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden text-grey-2"
          onClick={handleMenuClick}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
                onClick={() => handleLinkClick(link.url)}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;