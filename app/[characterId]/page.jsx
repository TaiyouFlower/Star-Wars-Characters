"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { fetchFromSwapi, getHomeworld } from "@/lib/api";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GeneralCard from "@/app/components/GeneralCard";
import GeneralModal from "@/app/components/GeneralModal";

export default function CharacterDetail() {
  const { characterId } = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (characterId) {
      const fetchCharacter = async () => {
        try {
          const response = await fetchFromSwapi(`people/${characterId}`);
          if (!response) {
            setError(true);
            return;
          }
          setCharacter(response);

          const filmsData = await Promise.all(
            response.films.map((url) => fetch(url).then((res) => res.json()))
          );
          const vehiclesData = await Promise.all(
            response.vehicles.map((url) => fetch(url).then((res) => res.json()))
          );
          const starshipsData = await Promise.all(
            response.starships.map((url) =>
              fetch(url).then((res) => res.json())
            )
          );

          setFilms(filmsData);
          setVehicles(vehiclesData);
          setStarships(starshipsData);
        } catch (error) {
          console.error("Error fetching character details:", error);
          setError(true);
        }
      };

      fetchCharacter();
    }
  }, [characterId]);

  useEffect(() => {
    if (character && character.homeworld) {
      const fetchHomeworld = async () => {
        try {
          const homeworldData = await getHomeworld(character.homeworld);
          setHomeworld(homeworldData.name);
        } catch (error) {
          console.error("Error fetching homeworld:", error);
        }
      };

      fetchHomeworld();
    }
  }, [character]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-[#FFEE58] mb-4">
          Character Not Found
        </h1>
        <p className="text-white mb-4">
          The character you are looking for does not exist.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-[#FFEE58] text-black rounded-md py-2 px-4"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  if (!character)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <span className="text-white">Loading...</span>
      </div>
    );

  return (
    <div className="flex flex-col items-center mt-8 mx-8">
      <Header />
      <div className="p-8">
        <div className="character-container flex flex-col">
          <h1 className="text-4xl font-bold text-[#FFEE58] mb-2">
            {character.name}
          </h1>
          <div className="character-info flex items-center gap-16">
            <Image
              src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
              alt={character.name}
              width={400}
              height={600}
            />
            <div className="ml-8 flex flex-col gap-10 text-2xl">
              <p className="text-white">
                <strong>Height:</strong> {character.height} cm
              </p>
              <p className="text-white">
                <strong>Mass:</strong> {character.mass} kg
              </p>
              <p className="text-white">
                <strong>Hair Color:</strong> {character.hair_color}
              </p>
              <p className="text-white">
                <strong>Skin Color:</strong> {character.skin_color}
              </p>
              <p className="text-white">
                <strong>Eye Color:</strong> {character.eye_color}
              </p>
              <p className="text-white">
                <strong>Gender:</strong> {character.gender}
              </p>
              <p className="text-white">
                <strong>Birth Year:</strong> {character.birth_year}
              </p>
              <p className="text-white">
                <strong>Homeworld:</strong> {homeworld || "Loading..."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#FFEE58]">Films</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {films.map((film, index) => (
              <GeneralCard
                key={index}
                item={film}
                category="films"
                onClick={() => handleItemClick(film)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#FFEE58]">Vehicles</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {vehicles.map((vehicle, index) => (
              <GeneralCard
                key={index}
                item={vehicle}
                category="vehicles"
                onClick={() => handleItemClick(vehicle)}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#FFEE58]">Starships</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {starships.map((starship, index) => (
              <GeneralCard
                key={index}
                item={starship}
                category="starships"
                onClick={() => handleItemClick(starship)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedItem && (
        <GeneralModal
          title={selectedItem.title || selectedItem.name}
          data={selectedItem}
          onClose={closeModal}
        />
      )}
      <Footer />
    </div>
  );
}
