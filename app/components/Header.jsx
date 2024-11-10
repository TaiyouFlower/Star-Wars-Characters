"use client";
import Link from "next/link";
import Search from "./Search";

export default function Header() {
  return (
    <header className="text-center mb-12">
      <Link href="/" passHref>
        <h1 className="font-jedi text-[#FFEE58] text-7xl cursor-pointer">
          Star Wars
        </h1>
      </Link>
      <Link href="/" passHref>
        <h3 className="font-jedi text-[#FFF] text-3xl cursor-pointer">
          Characters
        </h3>
      </Link>
      <Search />
    </header>
  );
}
