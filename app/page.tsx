"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Job Hunters
          </Link>
          <div className="space-x-4">
            <Link href="/resume" className="hover:underline">
              Create Resume
            </Link>
            <Link href="/cover-letter" className="hover:underline">
              Cover Letter
            </Link>
            <Link href="/applications" className="hover:underline">
              My Applications
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Job Hunters</h1>
        <p className="text-lg mb-8 text-center max-w-2xl">
          Your all-in-one platform for creating professional resumes and
          managing your job search process.
        </p>
        <button
          onClick={() => router.push("/resume")}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Create Resume
        </button>
      </main>

      <footer className="bg-gray-100 p-4 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Job Hunters. All rights reserved.</p>
      </footer>
    </div>
  );
}
