"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Box, Button, TextField } from "@mui/material";
import { useFormState } from "react-dom";

import login from "./action";
import * as schema from "./schema";

export default function Page() {
  const [lastResult, action] = useFormState(login, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema.loginForm });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Box sx={{ m: 2 }}>
      <h1>Login</h1>
      {/* onSubmitがあるとなぜかclient-side validationが効かなくなる */}
      <form action={action} {...getFormProps(form)} onSubmit={undefined}>
        <Box sx={{ m: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            {...getInputProps(fields.username, { type: "text" })}
            // keyは個別に指定しないとNext.jsがWarningを出す
            key={fields.username.key}
            error={(lastResult?.error?.username?.length ?? 0) > 0}
            helperText={lastResult?.error?.username?.join(",")}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <TextField
            label="Password"
            variant="outlined"
            {...getInputProps(fields.password, { type: "password" })}
            key={fields.password.key}
            error={(lastResult?.error?.password?.length ?? 0) > 0}
            helperText={lastResult?.error?.password?.join(",")}
          />
        </Box>
        <Box sx={{ m: 1 }}>
          <Button type="submit" variant="outlined">
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
}
