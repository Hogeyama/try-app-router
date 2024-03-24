"use client";
import { Box, Button } from "@mui/material";
import { useFormState } from "react-dom";
import logout from "./action";

export default function Page() {
  const [error, action] = useFormState(logout, null);
  return (
    <Box sx={{ m: 2 }}>
      {error ? (
        <p>{error}</p>
      ) : (
        <form action={action}>
          <Button type="submit" variant="outlined">
            Log out
          </Button>
        </form>
      )}
    </Box>
  );
}
