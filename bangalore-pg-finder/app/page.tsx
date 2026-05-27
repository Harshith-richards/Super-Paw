import pgs from "@/data/pgs.json";
import localities from "@/data/localities.json";
import PGCard from "@/components/pg-card";
import Link from "next/link";

export default function Home() {
  const featured = pgs.slice(0, 6);
  return <div className="space-y-10">
    <section className="glass rounded-3xl p-10 text-center"><h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">Find your perfect PG in Bangalore</h1><p className="mt-3 text-slate-300">For students, interns & professionals.</p><Link href="/listings" className="mt-6 inline-block rounded-full bg-violet-600 px-8 py-3">Start Searching</Link></section>
    <section><h2 className="mb-4 text-2xl font-semibold">Featured PGs</h2><div className="grid gap-4 md:grid-cols-3">{featured.map((p) => <PGCard key={p.id} pg={p as any}/> )}</div></section>
    <section><h2 className="mb-4 text-2xl font-semibold">Popular Localities</h2><div className="grid gap-3 md:grid-cols-4">{localities.map((l:any) => <Link key={l.name} className="glass rounded-2xl p-4" href={`/locality/${encodeURIComponent(l.name.toLowerCase().replace(/\s+/g,'-'))}`}>{l.name}<p className="text-sm text-slate-300">Avg ₹{l.avgRent}</p></Link>)}</div></section>
  </div>;
}
