// components/ThemedBody.tsx
"use client";

import { useTheme } from "@/components/ThemeContext";

export default function ThemedBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isDark } = useTheme();

  return (
    <body
      className={`${className}  ${
        isDark ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {children}
    </body>
  );
}
