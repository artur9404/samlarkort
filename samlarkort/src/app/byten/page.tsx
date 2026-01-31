"use client";
import Header from "@/components/Header";
import { Button, Card } from "@/components/ui";
import { useMemo, useState } from "react";

type TradeStatus = "pending_confirm" | "ongoing" | "completed" | "declined";
type Bucket = "active" | "proposal" | "history";

type Trade = {
  id: string;
  userName: string;
  createdLabel: string;
  status: TradeStatus;
  youGive: string;
  youGet: string;
  bucket: Bucket;
};

const initialTrades: Trade[] = [
  { id: "t1", userName: "Erik Svensson", createdLabel: "För 2 dagar sedan", status: "pending_confirm", youGive: "Charizard Holo 1st Edition", youGet: "Blastoise Base Set", bucket: "active" },
  { id: "t2", userName: "Anna Lindberg", createdLabel: "För 5 timmar sedan", status: "ongoing", youGive: "Pikachu Promo – 2020", youGet: "Mewtwo GX", bucket: "active" },
  { id: "p1", userName: "Jonas Karlsson", createdLabel: "För 1 dag sedan", status: "pending_confirm", youGive: "Umbreon V", youGet: "Espeon V", bucket: "proposal" },
  { id: "h1", userName: "Sara Berg", createdLabel: "För 3 veckor sedan", status: "completed", youGive: "Lapras – Fossil", youGet: "Gengar – Fossil", bucket: "history" },
];

function Status({ status }: { status: TradeStatus }) {
  const map: Record<TradeStatus, string> = {
    pending_confirm: "Väntar på bekräftelse",
    ongoing: "Pågående",
    completed: "Slutförd",
    declined: "Avböjd",
  };
  return <div className="text-xs text-slate-600">{map[status]}</div>;
}

export default function BytenPage() {
  const [tab, setTab] = useState<Bucket>("active");
  const [trades, setTrades] = useState<Trade[]>(initialTrades);

  const counts = useMemo(() => ({
    active: trades.filter(t => t.bucket === "active").length,
    proposal: trades.filter(t => t.bucket === "proposal").length,
    history: trades.filter(t => t.bucket === "history").length,
  }), [trades]);

  const visible = trades.filter(t => t.bucket === tab);

  const accept = (id: string) => setTrades(prev => prev.map(t => t.id === id ? { ...t, bucket: "history", status: "completed" } : t));
  const decline = (id: string) => setTrades(prev => prev.map(t => t.id === id ? { ...t, bucket: "history", status: "declined" } : t));

  const TabButton = ({ value, label }: { value: Bucket; label: string }) => (
    <button className={"flex-1 py-3 text-sm " + (tab === value ? "text-sky-700 font-semibold" : "text-slate-600")} onClick={() => setTab(value)} type="button">
      {label}
    </button>
  );

  return (
    <div>
      <Header />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wide text-sky-700 uppercase">Byteshantering</div>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-tight">
            Hantera dina <span className="italic text-slate-600">byten</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Följ dina aktiva byten, hantera inkommande förslag och se din kompletta byteshistorik.
          </p>
        </div>

        <Card className="mt-10 overflow-hidden">
          <div className="flex">
            <TabButton value="active" label={`Aktiva Byten (${counts.active})`} />
            <TabButton value="proposal" label={`Bytesförslag (${counts.proposal})`} />
            <TabButton value="history" label={`Historik (${counts.history})`} />
          </div>
          <div className="h-px bg-slate-200" />
          <div className="relative h-[2px] bg-transparent">
            <div className={"absolute top-0 h-[2px] bg-sky-700 transition-all duration-300 " + (tab === "active" ? "left-0 w-1/3" : tab === "proposal" ? "left-1/3 w-1/3" : "left-2/3 w-1/3")} />
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {visible.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
                <div className="text-sm font-semibold">Inget här ännu</div>
                <div className="mt-2 text-sm text-slate-600">När du startar ett byte dyker det upp här.</div>
              </div>
            )}

            {visible.map(t => (
              <Card key={t.id} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">{t.userName}</div>
                    <div className="text-xs text-slate-500">{t.createdLabel}</div>
                  </div>
                  <Status status={t.status} />
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Du ger</div>
                    <div className="mt-2 text-sm font-semibold">{t.youGive}</div>
                  </div>
                  <div className="text-center text-sky-700">⇄</div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">Du får</div>
                    <div className="mt-2 text-sm font-semibold">{t.youGet}</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <Button className="w-full" onClick={() => accept(t.id)} disabled={t.bucket === "history"}>Acceptera</Button>
                  <Button className="w-full sm:w-auto" variant="danger" onClick={() => decline(t.id)} disabled={t.bucket === "history"}>Avböj</Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
