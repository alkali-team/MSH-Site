import type { Metadata } from "next";
import { avenir, arimo } from "@/fonts";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "MSH",
  description: "MSH Site",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${avenir.variable} ${arimo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
