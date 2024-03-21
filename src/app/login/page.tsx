"use client";

import { useFormState } from "react-dom";
import login, { type Param } from "./action";
import { Box, Button, TextField } from "@mui/material";

export default function Page() {
  const [state, action] = useFormState(login, {});
  // 簡潔に型安全に書く方法が分からない。
  // next-safe-actionみたいなのに頼るべき？
  const username = "username" satisfies Param;
  const password = "password" satisfies Param;
  return (
    <Box sx={{ m: 2 }}>
      <h1>Login</h1>
      <form action={action}>
        <Box sx={{ m: 1 }}>
          <TextField
            id={username}
            name={username}
            label="Username"
            variant="outlined"
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            id={password}
            name={password}
            label="Password"
            variant="outlined"
            type="password"
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <Button type="submit" variant="outlined">
            Continue
          </Button>
        </Box>
        {state.error && <p>{state.error}</p>}
      </form>
    </Box>
  );
}
