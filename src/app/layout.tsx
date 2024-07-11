import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./global.css";

export const metadata: Metadata = {
  title: "SnapWeather",
  description: "동네 날씨를 알려드려요.",
  icons: {
    icon: "/SnapWeather.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <div>{children}</div>
      </body>
    </html>
  );
}
