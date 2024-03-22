import { z } from "zod";
import { password, username } from "@/lib/auth/schema";

export const loginForm = z.object({
  username,
  password,
});
