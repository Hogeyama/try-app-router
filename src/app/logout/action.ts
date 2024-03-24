"use server";
import { getServerSession, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout(_state: unknown, _formData: unknown) {
  const { session } = await getServerSession();
  if (!session) {
    return "Unauthorized";
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}
