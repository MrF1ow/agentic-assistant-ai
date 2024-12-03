"use client";

import * as React from "react";
import { TanstackProvider } from "./tanstack-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TanstackProvider>{children}</TanstackProvider>;
}
