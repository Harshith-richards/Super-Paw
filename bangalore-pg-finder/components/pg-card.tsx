"use client";
import { PG } from "@/lib/types";
import { Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";

export default function PGCard({ pg }: { pg: PG }) {
  const { favorites, toggle } = useFavorites();
  return <div className="glass rounded-2xl overflow-hidden hover:scale-[1.01] transition">
    <img src={pg.image} alt={pg.name} className="h-48 w-full object-cover"/>
    <div className="p-4 space-y-2">
      <div className="flex justify-between"><h3 className="font-semibold">{pg.name}</h3><button onClick={() => toggle(pg.id)}><Heart className={favorites.includes(pg.id) ? "fill-rose-500 text-rose-500" : ""}/></button></div>
      <p className="text-sm text-slate-300 flex gap-1"><MapPin size={16}/>{pg.area}</p>
      <p className="text-sm">₹{pg.rent.toLocaleString()} / month</p>
      <p className="text-sm flex gap-1"><Star size={16} className="text-yellow-400"/>{pg.rating}</p>
      <Link href={`/pg/${pg.id}`} className="inline-block rounded-xl bg-violet-600 px-4 py-2 text-sm">View details</Link>
    </div>
  </div>
}
