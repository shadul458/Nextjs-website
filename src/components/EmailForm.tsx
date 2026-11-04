// The "Work email + Book a demo" form.
//
// "use client" is IMPORTANT: by default Next.js components run on the server.
// Anything interactive (typing, clicking, useState) must run in the browser,
// so we mark this file as a Client Component with "use client".

"use client";

import { useState } from "react";
import DemoButton from "./DemoButton";

export default function EmailForm() {
  // useState stores values that change while the user interacts.
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page
    setSubmitted(true); // later you could send `email` to an API here
  }

  if (submitted) {
    return (
      <p className="mt-10 text-green-400">
        Thanks! We&apos;ll be in touch at {email}.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-2 border border-white/15 bg-black/40 p-1 sm:flex-row sm:items-center"
    >
      <input
        type="email"
        required
        placeholder="Work email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />
      <DemoButton type="submit" className="justify-center" />
    </form>
  );
}
