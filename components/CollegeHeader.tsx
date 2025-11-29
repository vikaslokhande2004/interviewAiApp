"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Menu, X } from "lucide-react";

const CollegeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Home Button */}
        <Button
          asChild
          className="btn-primary"
        >
          <Link href="/">Home</Link>
        </Button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 justify-center items-center">
          <Button
            asChild
            className="btn-primary"
          >
            <Link href="/student/profile">Profile</Link>
          </Button>
          {/* <Button
            asChild
            className="btn-primary"
          >
            <Link href="/progress">Start an Interview</Link>
          </Button> */}
        </div>

        {/* Logout + Hamburger */}
        <div className="flex items-center gap-2">
          <LogoutButton />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-2 p-2 rounded hover:bg-[#1a1a1a]"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t">
          <div className="flex flex-col gap-4 p-4">
            <Button
              asChild
              className="bg-[#cac5fe]"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/student/profile">Profile</Link>
            </Button>
            {/* <Button
              asChild
              className="bg-[#cac5fe]"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/progress">Start an Interview</Link>
            </Button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CollegeHeader;
