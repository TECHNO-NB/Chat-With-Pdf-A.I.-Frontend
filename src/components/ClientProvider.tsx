// src/components/ClientProvider.tsx
"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import React, { useEffect } from "react";

import UserVerifier from "./UserVerifier";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return <Provider store={store}><UserVerifier/>{children}</Provider>;
}
