"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchFromSwapi } from "@/lib/api";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetchFromSwapi(`people/?page=${currentPage}`);
        const charactersWithIds = response.results.map((character) => {
          const id = character.url.match(/\/people\/(\d+)\//)[1];
          return { ...character, id };
        });
        setCharacters(charactersWithIds);
        setTotalPages(Math.ceil(response.count / 10));
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const changePage = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center mt-8 mx-2 w-[80%]">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center w-full">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-8 mb-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md w-24 ${
            currentPage === 1
              ? "bg-gray-300 cursor-default"
              : "bg-[#FFEE58] text-black hover:bg-[#ffee58ca]"
          }`}
        >
          Previous
        </button>
        <span className="text-lg text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md w-24 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-default text-black"
              : "bg-[#FFEE58] text-black hover:bg-[#ffee58ca]"
          }`}
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
}
