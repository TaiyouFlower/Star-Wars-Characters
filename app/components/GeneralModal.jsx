import React, { useEffect, useRef } from "react";

export default function GeneralModal({ data, onClose }) {
  const modalRef = useRef(null);

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

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 mx-4">
      <div
        ref={modalRef}
        className="bg-[#1A1A1A] p-8 rounded-lg max-w-lg w-full transition-all transform scale-95 opacity-0 animate-modal"
      >
        <div className="flex justify-between items-center mb-4">
          {data.name && (
            <h2 className="text-xl font-bold text-[#FFEE58]">{data.name}</h2>
          )}
          {data.title && (
            <h2 className="text-xl font-bold text-[#FFEE58]">{data.title}</h2>
          )}
          <button
            onClick={onClose}
            className="text-black text-center bg-[#FFEE58] rounded-full w-8 h-8 hover:bg-[#ffee58ca]"
          >
            X
          </button>
        </div>
        <div className="text-white mb-4 text-lg">
          {data.director && (
            <p>
              <strong>Director:</strong> {data.director}
            </p>
          )}
          {data.producer && (
            <p>
              <strong>Producer:</strong> {data.producer}
            </p>
          )}
          {data.release_date && (
            <p>
              <strong>Release Date:</strong> {data.release_date}
            </p>
          )}
          {data.episode_id && (
            <p>
              <strong>Episode:</strong> {data.episode_id}
            </p>
          )}
          {data.model && (
            <p>
              <strong>Model:</strong> {data.model}
            </p>
          )}
          {data.manufacturer && (
            <p>
              <strong>Manufacturer:</strong> {data.manufacturer}
            </p>
          )}
          {data.cost_in_credits && (
            <p>
              <strong>Cost in Credits:</strong> {data.cost_in_credits}
            </p>
          )}
          {data.starship_class && (
            <p>
              <strong>Starship Class:</strong> {data.starship_class}
            </p>
          )}
          {data.vehicle_class && (
            <p>
              <strong>Vehicle Class:</strong> {data.vehicle_class}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
