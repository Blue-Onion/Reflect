import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Reflect",
  description: "A Journal app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* Background Image */}
          <div className="bg-[url('/bg.jpg')] fixed -z-10 opacity-50 inset-0"></div>
          <Navbar />
          {/* Main Content */}
          <main className="min-h-screen mb-25">{children}</main>
          <Toaster richColors />
          {/* Footer */}
          <footer className="bg-orange-300 py-8 bg-opacity-50">
            <div className="mx-auto text-center px-4 text-gray-800">
            © {new Date().getFullYear()} Blue Onion. All rights reserved.
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
