import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Socialize",
  description: "Social App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-dark container mx-auto `}>
        {children}
      </body>
    </html>
  );
}
