
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchImageFromSWVisualGuide } from "@/lib/api";

const getIdFromUrl = (url) => {
  if (!url) return null;
  const segments = url.split("/");
  return segments[segments.length - 2];
};

export default function GeneralCard({ item, category, onClick }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false); 
  const itemId = item && item.url ? getIdFromUrl(item.url) : null;

  useEffect(() => {
    if (itemId) {
      const loadImage = async () => {
        try {
          const imageRes = await fetchImageFromSWVisualGuide(
            `${category}/${itemId}`
          );
          setImageUrl(imageRes);
        } catch {
          setImageUrl(null); 
        }
      };
      loadImage();
    }
  }, [category, itemId]);

  if (!imageUrl) return null;

  return (
    <div
      onClick={onClick}
      className="bg-[#141414] text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={item.title || item.name}
        width={180}
        height={240}
        className="w-full h-64 object-fill"
        onLoadingComplete={() => setImageLoaded(true)} 
        onError={() => setImageLoaded(false)} 
      />
      {imageLoaded && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#ffee58ca]">
            {item.title || item.name}
          </h2>
        </div>
      )}
    </div>
  );
}
