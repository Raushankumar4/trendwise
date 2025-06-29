"use client";

import { useSession } from "next-auth/react";
import AuthButton from "../components/AuthButton";
import Home from "../components/Home";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Please log in to view TrendWise content
        </h2>
        <AuthButton />
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto">
      <Home />
    </main>
  );
}
