"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("data is logged in navbar client side", session, status);
  const user: User = session?.user as User;
  return (
    <nav className="px-4 py-1 md:py-3 shadow-md bg-gray-400 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0 text-black">
          True Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4">Welcome {user?.username || user?.email}</span>{" "}
            <Button className="w-full md:w-auto" onClick={() => signOut}>
              Log out
            </Button>
          </>
        ) : (
          <Link href="/signin">
            <Button className="w-full md:w-auto">Log in</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
