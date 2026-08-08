import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moscow Evening Thought",
  description: "A reading fellowship hosted by Bruce Johnson and Carter Brown.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#06172d] font-serif text-[#f1e7cd] antialiased">
        {children}
      </body>
    </html>
  );
}
