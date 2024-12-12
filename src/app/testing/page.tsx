"use client";

import { useSession } from "next-auth/react";

export default function TestingPage() {
  const { data: session, status } = useSession();

  // console.log("Session data:", session);
  // console.log("Session status:", status);

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>No session found. Please log in.</p>;

  return (
    <div>
      <h1>Welcome, {session.user?.username}</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
