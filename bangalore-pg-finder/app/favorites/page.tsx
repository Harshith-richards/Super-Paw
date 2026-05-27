"use client";
import pgsData from "@/data/pgs.json";
import PGCard from "@/components/pg-card";
import { useFavorites } from "@/hooks/use-favorites";

export default function FavPage(){ const {favorites}=useFavorites(); const items=(pgsData as any[]).filter(p=>favorites.includes(p.id)); return <div><h1 className="text-3xl font-bold mb-4">Your Favorites</h1><div className="grid gap-4 md:grid-cols-3">{items.map(p=><PGCard key={p.id} pg={p as any}/> )}</div></div>; }
