import type { Metadata } from "next";
import { Inter, Indie_Flower} from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const handwriting = Indie_Flower({weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Watercolor Books",
  description: "generate scenes from books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={handwriting.className}>{children}</body>
    </html>
  );
}
