import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchImageFromSWVisualGuide } from "@/lib/api";

export default function CharacterCard({ character, onClick }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageRes = await fetchImageFromSWVisualGuide(
          "characters/" + character.id
        );
        setImageUrl(imageRes);
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };
    loadImage();
  }, [character.id]);

  return (
    <div
      onClick={onClick}
      className="bg-[#141414] text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full cursor-pointer"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={character.name}
          width={180}
          height={240}
          className="w-full h-64 object-fill"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#ffee58ca]">{character.name}</h2>
      </div>
    </div>
  );
}
