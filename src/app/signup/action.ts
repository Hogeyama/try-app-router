"use server";

import "server-only";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { parseWithZod } from "@conform-to/zod";
import { SubmissionResult } from "@conform-to/react";
import { Prisma, prisma } from "@/lib/db";
import { lucia } from "@/lib/auth";
import * as schema from "./schema";

export default async function signup(
  _: SubmissionResult | null,
  formData: FormData,
): Promise<SubmissionResult | null> {
  const submission = parseWithZod(formData, {
    schema: schema.signupForm,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const { username, password } = submission.value;

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await prisma.user.create({
      data: {
        id: userId,
        username: username,
        hashed_password: hashedPassword,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          status: "error",
          error: {
            username: ["Username already exists"],
          },
        };
      }
    }
    throw err;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
