"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState("");
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const response = await fetch(character.homeworld);
        const homeworldData = await response.json();
        setHomeworld(homeworldData.name);
      } catch (error) {
        console.error("Failed to fetch homeworld:", error);
      }
    };
    fetchHomeworld();
  }, [character.homeworld]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleNav = () => {
    router.push(`/${character.id}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 mx-4">
      <div
        ref={modalRef}
        className="bg-[#1A1A1A] p-8 rounded-lg max-w-lg w-full transition-all transform scale-95 opacity-0 animate-modal"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#FFEE58]">{character.name}</h2>
          <button
            onClick={onClose}
            className="text-black text-center bg-[#FFEE58] rounded-full w-8 h-8 hover:bg-[#ffee58ca]"
          >
            X
          </button>
        </div>
        <div className="text-white mb-4">
          <p>
            <strong>Height:</strong> {character.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Homeworld:</strong> {homeworld}
          </p>
        </div>
        <button
          onClick={handleNav}
          className="bg-[#FFEE58] text-black rounded-md py-2 px-4 w-full"
        >
          View More
        </button>
      </div>
    </div>
  );
}
