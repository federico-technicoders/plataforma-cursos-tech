import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="absolute flex justify-center items-center w-full h-14 top-0 left-0 z-10"> 
            <div className="flex justify-evenly items-center w-full">
                <Link href={'/'}>Inicio</Link>
                <Link href={'/contactanos'}>Contactenos</Link>               
            </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
