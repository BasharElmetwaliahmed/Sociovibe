import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import { Toaster } from "react-hot-toast";

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
        <Toaster />
      </body>
    </html>
  );
}
