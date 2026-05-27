import "./globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className="dark"><body><header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur"><nav className="mx-auto flex max-w-7xl items-center justify-between p-4"><Link href="/" className="font-bold text-xl">Bangalore PG Finder</Link><div className="flex gap-3"><Link href="/listings">Listings</Link><Link href="/favorites">Favorites</Link><Link href="/compare">Compare</Link><ThemeToggle/></div></nav></header><main className="mx-auto max-w-7xl p-4">{children}</main></body></html>;
}
