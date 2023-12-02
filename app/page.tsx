"use client";

import { useSession } from "next-auth/react";
import PageContainer from "./components/PageContainer";
import { Roulette } from "./components/Roulette";
import { Header } from "./components/Header";

export default function Home() {
  const session = useSession();

  return (
    <PageContainer>
      <div className="border border-red-600 bg-red-500/20 text-red-500 rounded-md p-4 mb-4">
        <h1 className="text-xs font-bold uppercase mb-2">Alerta</h1>
        <p className="text-sm">
          <b>EM NENHUMA HIPÓTESE</b> é e/ou será feita a troca e/ou venda de
          coins por dinheiro real. <b>TODAS</b> as coins existentes{" "}
          <b>SÃO FICTÍCIAS</b> e <b>INTRANSFERÍVEIS</b> para o mundo real.
        </p>
      </div>
      <Roulette.Root />
    </PageContainer>
  );
}
