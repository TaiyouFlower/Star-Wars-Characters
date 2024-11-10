"use client";

import { useEffect, useState } from "react";
import { fetchFromSwapi, fetchImageFromSWVisualGuide } from "@/lib/api";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetchFromSwapi(`people/?page=${page}`);
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
  }, [page]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-8 mx-2">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center w-full">
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
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md w-24 ${
            page === 1
              ? "bg-gray-300 cursor-default"
              : "bg-[#FFEE58] text-black hover:bg-[#ffee58ca]"
          }`}
        >
          Previous
        </button>
        <span className="text-lg text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md w-24 ${
            page === totalPages
              ? "bg-gray-300 cursor-default"
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
