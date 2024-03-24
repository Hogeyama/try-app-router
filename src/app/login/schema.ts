import { password, username } from "@/lib/auth/schema";
import { z } from "zod";

export const loginForm = z.object({
  username,
  password,
});
