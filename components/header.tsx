import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

// Functional component for the application header
const Header = () => {
  return (
    <div className="p-1 md:p-2 lg:p-4 m-2 border rounded-lg mb-0">
      <div className="flex justify-between items-center">
        <Link href='/' className="text-xl md:text-2xl lg:text-3xl font-bold">
          <span>Commands</span>
          <span className="text-primary">Hub</span>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
