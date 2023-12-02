"use client";

import { sidebarVisibilityAtom } from "@/app/state/atoms/sidebarVisibility";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import HamburguerIcon from "../Icons/Hamburguer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { match } from "ts-pattern";

export default function SidebarRoot() {
  const [sidebarVisibility, setSidebarVisibility] = useRecoilState(
    sidebarVisibilityAtom
  );

  function closeSidebar() {
    console.log(sidebarVisibility);
    return setSidebarVisibility(false);
  }

  const session = useSession();

  return (
    <motion.aside
      animate={{ x: 0 }}
      initial={{ x: -500 }}
      exit={{ x: -500 }}
      transition={{ duration: 0.9, ease: "easeIn" }}
      data-isvisible={sidebarVisibility}
      className="lg:hidden w-64 h-screen z-10 top-0 left-0 data-[isvisible=false]:hidden bg-black text-white p-4 flex flex-col fixed"
    >
      <header className="flex justify-between items-center">
        <h1>Sidebar</h1>
        <button onClick={() => closeSidebar()}>
          <span className="text-gray-700 dark:text-gray-300">
            <HamburguerIcon className="w-6 h-6 fill-white" />
          </span>
        </button>
      </header>

      {session.data?.user && session.data.user.image && (
        <button className="mt-auto bg-white/5 rounded-md p-2 flex gap-2">
          <Image
            src={session.data.user?.image}
            alt="Logo"
            width={24}
            height={24}
            className="rounded-full"
          />

          <span className="text-gray-700 dark:text-gray-300">
            {session.data.user?.name}
          </span>
        </button>
      )}
    </motion.aside>
  );
}
