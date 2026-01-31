import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";

const HERO_IMG = "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?auto=format&fit=crop&w=1400&q=80";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-lg sm:text-xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-[10px] sm:text-xs tracking-wide text-slate-500 uppercase">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 py-14 sm:py-16 lg:py-20">
            <div className="flex flex-col justify-center">
              <div className="mb-4"><Badge>SVERIGES SAMLARPORTAL</Badge></div>
              <h1 className="font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight">
                Samla, Byta,<br /><span className="italic text-slate-600">Upptäck</span><br />Dina Kort
              </h1>
              <div className="mt-6 flex gap-4">
                <div className="w-[3px] rounded-full bg-slate-200" />
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  Visa din samling, hitta sällsynta kort och handla säkert med andra samlare.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/listings/new"><Button className="rounded-full">Kom igång gratis</Button></Link>
                <Link href="/listings"><Button className="rounded-full" variant="outline">Utforska annonser</Button></Link>
              </div>
              <div className="mt-10 flex items-center gap-10 max-w-md">
                <Stat value="2,400+" label="ANVÄNDARE" />
                <div className="h-8 w-px bg-slate-200" />
                <Stat value="15,000+" label="KORT" />
                <div className="h-8 w-px bg-slate-200" />
                <Stat value="850+" label="BYTEN" />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-sm ring-1 ring-slate-200">
                  <Image src={HERO_IMG} alt="Samlarbild" fill className="object-cover" />
                </div>
                <Card className="absolute left-6 right-6 bottom-6">
                  <div className="p-4 sm:p-5 flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">✨</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">Nytt denna vecka</div>
                      <div className="mt-1 text-xs text-slate-600">+124 kort tillagda av samlare</div>
                    </div>
                    <Link href="/byten"><Button variant="outline" className="rounded-full">Se byten</Button></Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <div>© {new Date().getFullYear()} Samlarkort.se</div>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-slate-900">Villkor</a>
              <a href="#" className="hover:text-slate-900">Integritet</a>
              <a href="#" className="hover:text-slate-900">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
