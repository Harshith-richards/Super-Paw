"use client";
import { useState } from "react";
import pgs from "@/data/pgs.json";

export default function Compare(){const [ids,setIds]=useState<string[]>([]);const selected=(pgs as any[]).filter(p=>ids.includes(p.id));return <div className="space-y-4"><h1 className="text-3xl font-bold">Compare PGs</h1><select multiple className="glass p-3 rounded-2xl w-full" onChange={(e)=>setIds(Array.from(e.target.selectedOptions).map(o=>o.value).slice(0,3))}>{(pgs as any[]).slice(0,40).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select><div className="grid md:grid-cols-3 gap-4">{selected.map(p=><div key={p.id} className="glass rounded-2xl p-4"><h3>{p.name}</h3><p>₹{p.rent}</p><p>{p.rating}★</p><p>{p.occupancy.join('/')}</p></div>)}</div></div>}
