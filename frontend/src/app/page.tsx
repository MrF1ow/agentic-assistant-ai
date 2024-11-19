"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  }, []);
  return <div> Hello World! </div>;
}
