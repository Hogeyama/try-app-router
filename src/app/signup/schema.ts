import { z } from "zod";
import { password, username } from "@/lib/auth/schema";

export const signupForm = z.object({
  username,
  password,
});
