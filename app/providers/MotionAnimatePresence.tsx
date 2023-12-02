"use client";

import { AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function MotionAnimatePresence({ children }: Props) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
