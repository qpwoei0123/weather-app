import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import style from "./style.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "날씨앱",
  description: "날씨를 알려드려요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={style.container}>{children}</div>
      </body>
    </html>
  );
}
