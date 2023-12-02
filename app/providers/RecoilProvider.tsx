"use client";

import { RecoilRoot } from "recoil";

interface Props {
  children: React.ReactNode;
}

export default function RecoilProvider({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
