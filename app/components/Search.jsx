"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchFromSwapi } from "@/lib/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchSearchResults = async () => {
    if (query.length > 1) {
      setIsLoading(true);
      try {
        const response = await fetchFromSwapi(`people/?search=${query}`);
        setResults(response.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSuggestionClick = (result) => {
    const characterId = result.url.split("/")[5];
    router.push(`/${characterId}`); 
  };

  const handleSearchSubmit = () => {
    if (query) {
      router.push(`/searchResult/${query}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="search-container mt-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for characters..."
        className="p-2 w-full text-lg border rounded-md text-black"
      />
      {isLoading && <p className="text-white mt-2">Loading...</p>}
      <div className="search-results mt-4">
        {results.length > 0 && (
          <ul>
            {results.map((item) => (
              <li key={item.url} className="text-[#FFEE58]">
                <button
                  onClick={() => handleSuggestionClick(item)}
                  className="text-left w-full p-2 hover:bg-[#333]"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
