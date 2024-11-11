"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Search from "./Search";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateToHome = () => {
    const currentPage = searchParams.get("page");

    if (pathname === "/" && currentPage === "1") {
      router.refresh();
    } else {
      router.push("/?page=1");
    }
  };

  return (
    <header className="text-center mb-12">
      <h1
        onClick={navigateToHome}
        className="font-jedi text-[#FFEE58] text-7xl cursor-pointer"
      >
        Star Wars
      </h1>
      <h3
        onClick={navigateToHome}
        className="font-jedi text-[#FFF] text-3xl cursor-pointer"
      >
        Characters
      </h3>
      <Search />
    </header>
  );
}
