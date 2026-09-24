import localFont from "next/font/local";
import { Arimo } from "next/font/google";

export const avenir = localFont({
  src: [
    { path: "./avenir/Avenir-Light.ttf", weight: "300", style: "normal" },
    { path: "./avenir/Avenir-Regular.ttf", weight: "400", style: "normal" },
    { path: "./avenir/Avenir-Medium.ttf", weight: "500", style: "normal" },
    { path: "./avenir/Avenir-Heavy.ttf", weight: "800", style: "normal" },
    { path: "./avenir/Avenir-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
});

export const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-arimo",
  display: "swap",
});
