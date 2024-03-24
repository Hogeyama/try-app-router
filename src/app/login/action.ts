"use server";

import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import "server-only";
import * as schema from "./schema";

export default async function login(
  _: SubmissionResult | null,
  formData: FormData,
): Promise<SubmissionResult | null> {
  const submission = parseWithZod(formData, {
    schema: schema.loginForm,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { username, password } = submission.value;

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!existingUser) {
    // NOTE:
    // Returning immediately allows malicious actors to figure out valid usernames from response times,
    // allowing them to only focus on guessing passwords in brute-force attacks.
    // As a preventive measure, you may want to hash passwords even for invalid usernames.
    // However, valid usernames can be already be revealed with the signup page among other methods.
    // It will also be much more resource intensive.
    // Since protecting against this is none-trivial,
    // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
    // If usernames are public, you may outright tell the user that the username is invalid.
    return {
      status: "error",
      error: {
        username: ["Incorrect username or password"],
      },
    };
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password,
  );
  if (!validPassword) {
    return {
      status: "error",
      error: {
        username: ["Incorrect username or password"],
      },
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
