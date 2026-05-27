import pgs from "@/data/pgs.json";

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pg = (pgs as any[]).find((p) => p.id === id);
  if (!pg) return <div>PG not found.</div>;
  return <div className="space-y-6"><img src={pg.image} alt={pg.name} className="h-80 w-full rounded-3xl object-cover"/><h1 className="text-3xl font-bold">{pg.name}</h1><p>{pg.address}</p><p>Rent: ₹{pg.rent} | Deposit: ₹{pg.rent * 2}</p><p>Amenities: {pg.amenities.join(", ")}</p><div className="flex gap-2"><a className="rounded-xl bg-green-600 px-4 py-2" href={`https://wa.me/${pg.whatsapp}`}>WhatsApp owner</a><a className="rounded-xl bg-blue-600 px-4 py-2" href={`tel:${pg.phone}`}>Call owner</a></div></div>;
}
