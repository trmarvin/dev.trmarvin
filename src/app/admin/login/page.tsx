import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/posts");

  // DEBUG (remove after it works)
  console.log("ADMIN_PASSWORD set?", !!process.env.ADMIN_PASSWORD);

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set("admin", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect(next);
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = React.use(searchParams);

  const next = sp.next ?? "/admin/posts";
  const error = sp.error === "1";

  return (
    <main className="max-w-sm mx-auto py-12 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Login</h1>

      {error && <p className="text-sm text-red-600">Wrong password.</p>}

      <form action={login} className="space-y-3">
        <input type="hidden" name="next" value={next} />

        <input
          className="border rounded px-3 py-2 w-full"
          type="password"
          name="password"
          placeholder="Admin password"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white w-full"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
