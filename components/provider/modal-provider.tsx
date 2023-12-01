"use client";

import { useEffect, useState } from "react";
import { ToastProvider } from "@/components/provider/toast-provider";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <ToastProvider />
    </>
  );
};
