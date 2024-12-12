"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { Button } from "./ui/button";


const Navbar = () => {
  const { data: session} = useSession();
  

  // console.log(session);
  // console.log("data is logged in navbar client side", session, status);
  const user: User = session?.user as User;
  return (
    <nav className="px-4 py-1 md:py-3 shadow-md bg-[#112D4E] text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0 text-white">
          True Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4 text-2xl">
              Welcome {user?.username || user?.email}
            </span>{" "}
            <Button
              className="w-full md:w-auto bg-white text-black hover:bg-slate-200"
              onClick={() => signOut()}
            >
              Log out
            </Button>
          </>
        ) : (
          <Link href="/signin">
            <Button className="w-full md:w-auto bg-white text-black hover:bg-slate-200">
              Log in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
