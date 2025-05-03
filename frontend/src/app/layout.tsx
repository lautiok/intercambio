import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { InstitucionalProvider } from "@/context/institucionalContext";
import { BooksProvider } from "@/context/booksContext";
import { ExchangeProvider } from "@/context/exchangeContext";
import { ChatProvider } from "@/context/chatContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Intercambia",
  description: "Intercambia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} `}>
        <AuthProvider>
          <BooksProvider>
          <InstitucionalProvider>
            <ExchangeProvider>
              <ChatProvider>
              {children}
              </ChatProvider>
            </ExchangeProvider>
            </InstitucionalProvider>
          </BooksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
