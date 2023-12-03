"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export const ToggleTheme = () => {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setTheme(isDark ? "light" : "dark");
  };

  return <Switch onClick={toggleTheme} />;
};
