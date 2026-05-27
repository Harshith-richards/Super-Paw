"use client";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => { setFavorites(JSON.parse(localStorage.getItem("pg-favs") || "[]")); }, []);
  const toggle = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("pg-favs", JSON.stringify(next));
  };
  return { favorites, toggle };
};
