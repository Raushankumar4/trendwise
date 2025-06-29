import { Inter } from "next/font/google";
import { AuthProvider } from "./providers.js";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrendWise",
  description: "AI-powered article generator",
  other: {
    "google-site-verification": "googledab816b47a60c87d.html",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <main className="max-w-screen-xl mx-auto px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
