// src/components/ClientProvider.tsx
'use client';

import { Provider } from "react-redux";
import store from "@/redux/store";
import React from "react";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
