"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (session) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="User menu"
        >
          <img
            src={session.user.image || "/default-avatar.png"}
            alt={session.user.name || "User avatar"}
            className="w-10 h-10 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-blue-500 transition"
            loading="lazy"
            decoding="async"
          />
          <span className="hidden sm:inline font-semibold text-gray-900 truncate max-w-[10rem]">
            {session.user.name}
          </span>

          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            role="menu"
            aria-label="User menu"
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50
                       animate-fade-in-down"
          >
            <button
              onClick={() => {
                setDropdownOpen(false);
                router.push("/profile");
              }}
              role="menuitem"
              className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition"
            >
              View Profile
            </button>
            <button
              onClick={() => {
                setDropdownOpen(false);
                signOut();
              }}
              role="menuitem"
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 focus:bg-red-50 focus:outline-none transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-5 py-2 text-black rounded-md shadow-md  focus:outline-none focus:ring-2 0 transition font-semibold"
      aria-label="Login with Google"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 533.5 544.3"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M533.5 278.4c0-18.3-1.6-36-4.8-53.3H272v100.8h146.9c-6.3 34-25 62.8-53.7 82v68.1h86.8c50.8-46.8 80.5-115.6 80.5-197.6z"
        />
        <path
          fill="#34A853"
          d="M272 544.3c72.7 0 133.7-24 178.2-65.2l-86.8-68.1c-24.1 16.2-54.8 25.7-91.4 25.7-70.3 0-130-47.6-151.5-111.5H30.4v69.9c44.4 87.5 135 149.2 241.6 149.2z"
        />
        <path
          fill="#FBBC05"
          d="M120.5 323.2c-10.3-30.4-10.3-63.5 0-93.9V159.4H30.4c-43.7 86.7-43.7 189.3 0 276l90.1-69.9z"
        />
        <path
          fill="#EA4335"
          d="M272 107.7c39.5 0 75 13.6 102.8 40.3l77-77C399.7 24 337.6 0 272 0 165.4 0 74.8 61.7 30.4 149.2l90.1 69.9c21.5-63.9 81.2-111.4 151.5-111.4z"
        />
      </svg>
      Login with Google
    </button>
  );
}
