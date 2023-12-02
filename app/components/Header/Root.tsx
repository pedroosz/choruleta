"use client";

import { sidebarVisibilityAtom } from "@/app/state/atoms/sidebarVisibility";
import { useRecoilState } from "recoil";
import HamburguerIcon from "../Icons/Hamburguer";

export default function HeaderRoot() {
  const [sidebarVisibility, setSidebarVisibility] = useRecoilState(
    sidebarVisibilityAtom
  );

  function toggleSidebar() {
    console.log(sidebarVisibility);
    return setSidebarVisibility(!sidebarVisibility);
  }

  return (
    <header className="w-full p-4 fixed bg-neutral-900">
      <div className="flex items-center max-w-5xl w-full mx-auto gap-4">
        <button onClick={() => toggleSidebar()} className="lg:hidden">
          <HamburguerIcon className="w-6 h-6 fill-white" />
        </button>

        <h1 className="font-bold uppercase">Choruleta</h1>
      </div>
    </header>
  );
}
