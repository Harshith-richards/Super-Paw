"use client";
import { useMemo, useState } from "react";
import pgsData from "@/data/pgs.json";
import PGCard from "@/components/pg-card";

export default function ListingsPage() {
  const [q, setQ] = useState(""); const [type, setType] = useState("All");
  const pgs = useMemo(() => (pgsData as any[]).filter(p => (type==="All"||p.type===type) && (p.area.toLowerCase().includes(q.toLowerCase())||p.name.toLowerCase().includes(q.toLowerCase()))), [q,type]);
  return <div className="space-y-4"><h1 className="text-3xl font-bold">Explore PGs</h1><div className="glass rounded-2xl p-4 flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by area, college, metro" className="w-full rounded-xl bg-white/10 p-2"/><select value={type} onChange={e=>setType(e.target.value)} className="rounded-xl bg-white/10 p-2"><option>All</option><option>Boys</option><option>Girls</option><option>Co-living</option></select></div><div className="grid gap-4 md:grid-cols-3">{pgs.slice(0,60).map(p => <PGCard key={p.id} pg={p as any}/> )}</div></div>;
}
