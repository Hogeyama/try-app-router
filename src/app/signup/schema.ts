import { password, username } from "@/lib/auth/schema";
import { z } from "zod";

export const signupForm = z.object({
  username,
  password,
});
